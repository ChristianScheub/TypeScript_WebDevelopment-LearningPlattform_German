import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import { MonacoDiffEditor } from "react-monaco-editor";
import MonacoEditor from "react-monaco-editor";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import NavbarComponent from "../../base/navbarComponent";
import htmlToReactParser from "html-react-parser";
import parserBabel from "prettier/parser-babel";
import parserCss from "prettier/parser-postcss";
import "./lessonDetail.css";
import {
  getProgressByCategoryIn1000,
  CategoryProgress,
  saveCompletedLesson,
  xpValueOfCompletedLessonInCategory,
} from "../dashboard/categoryProgress";

import { js as beautify } from "js-beautify";
import phpPlugin from "@prettier/plugin-php/standalone";

import { possibleLinksToReplace } from "../app_configuration/app_settings";
var javaToJavascript = require("java-to-javascript");

interface LessonProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    exercise: string;
    correctAnswer: string;
    language: string;
    category: string;
    unitTest: string;
    showDisplaySolution: string;
    quizText: string;
    quizOptions: string;
    quizSolution: string;
  };
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const shouldDisplaySolution = lesson.showDisplaySolution;
  const [similarity, setSimilarity] = useState<number | null>(null);
  const optionsArray = lesson.quizOptions
    .split(";")
    .filter((option) => option !== "");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const closeOverlay = () => {
    setIsCorrect(null);
  };
  const targetXP = xpValueOfCompletedLessonInCategory(lesson.category);
  const [animatedXP, setAnimatedXP] = useState(0);

  const [showBackButton, setShowBackButton] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [completed] = useState<string[]>(
    JSON.parse(localStorage.getItem("completedLessons") || "[]")
  );
  const [showCodeSolution, setShowSolution] = useState(false);
  const progressSavingEnabled =
    localStorage.getItem("progress-saving-enabled") === "true";

  useEffect(() => {
    const timer = setInterval(() => {
      if (animatedXP < targetXP) {
        setAnimatedXP((prevXP) => prevXP + 1);
      } else {
        clearInterval(timer);
      }
    }, 5);

    return () => clearInterval(timer);
  }, [animatedXP, targetXP]);

  const parse = (code: string) => {
    try {
      return htmlToReactParser(code);
    } catch (error) {
      return code;
    }
  };

  const parseContentFunction = (code: string) => {
    const boldRegex = /<strong>(.*?)<\/strong>/g;
    const lines = code.split("\n");
    const parsed = lines.map((line, index) => {
      let currentIndex = 0;
      const elements = [];
      let match = boldRegex.exec(line);
      while (match !== null) {
        const before = line.slice(currentIndex, match.index);
        if (before) {
          elements.push(before);
        }
        const text = match[1];
        elements.push(<strong key={index}>{text}</strong>);
        currentIndex = match.index + match[0].length;
        match = boldRegex.exec(line);
      }
      const remaining = line.slice(currentIndex);
      if (remaining) {
        elements.push(remaining);
      }
      return (
        <React.Fragment key={index}>
          {elements}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
    return parsed;
  };

  useEffect(() => {
    if (completed.includes(lesson.id)) {
      setIsAnswerCorrect(true);
    }
  }, [lesson.id, completed]);

  const calculateSimilarity = useCallback(
    (str1: string, str2: string): number => {
      const matrix = [];

      let i, j;

      for (i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
      }

      for (j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
      }

      for (i = 1; i <= str2.length; i++) {
        for (j = 1; j <= str1.length; j++) {
          if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
            );
          }
        }
      }

      const similarity =
        1 -
        matrix[str2.length][str1.length] / Math.max(str1.length, str2.length);

      return similarity;
    },
    []
  );

  const currentCategoryProgress: CategoryProgress | undefined =
    getProgressByCategoryIn1000().find(
      (progress) => progress.category === lesson.category
    );

  const currentCompletedXP: number = currentCategoryProgress
    ? currentCategoryProgress.completed
    : 0;
  const currentTotalXP: number = currentCategoryProgress
    ? currentCategoryProgress.total
    : 0;

  const checkQuizAnswer = useCallback(() => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const selectedOption = formData.get("quizOption") as string;
      if (selectedOption === lesson.quizSolution) {
        setIsCorrect(true);
        saveCompletedLesson(lesson.id)();

        setShowBackButton(true);
        setIsAnswerCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  }, [lesson.quizSolution]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const formatCode = useCallback((code: string, language: string) => {
    try {
      let parser;
      // Determine the parser based on the language
      switch (language) {
        case "html":
        case "htmlCss":
        case "htmlJs":
        case "htmlCssJs":
          parser = "html";
          break;
        case "css":
          parser = "css";
          break;
        case "js":
          parser = "babel";
          break;
        case "java":
          parser = "java";
          break;
        case "php":
          parser = "php";
          code = code.replace("<?php", "<?php\n");

          const lastIndex = code.lastIndexOf("?>");
          code = `${code.slice(0, lastIndex)}\n${code.slice(lastIndex)}`;

          break;
        case "csharp":
          parser = "csharp";
          break;
        default:
          // fallback to HTML if language is not recognized
          parser = "html";
      }

      if (parser === "java") {
        const formattedJavaCode1 = beautify(code, {
          indent_size: 2,
          indent_with_tabs: false,
          eol: "\n",
          preserve_newlines: true,
          brace_style: "collapse",
          space_in_empty_paren: true,
          keep_array_indentation: true,
        });

        console.log(formattedJavaCode1);

        var jsString = javaToJavascript(formattedJavaCode1);
        console.log(jsString);

        //Now same for unit tests

        return formattedJavaCode1;
      } else {
        return prettier.format(code, {
          parser: parser,
          plugins: [parserHtml, parserBabel, parserCss, phpPlugin],
        });
      }
    } catch (error) {
      console.error("Fehler beim Formatieren des Codes:", error);
      return code;
    }
  }, []);

  const formattedCorrectAnswer = formatCode(
    lesson.correctAnswer,
    lesson.language
  );

  function removeHrefLinks(html: string): string {
    const linkRegex = possibleLinksToReplace.map((link) =>
      link.replace(".", "\\.")
    );
    const regex = new RegExp(`href="(#[^"]*|${linkRegex.join("|")})"`, "g");
    return html.replace(regex, "");
  }

  const checkAnswerWithoutAll = useCallback(() => {
    saveCompletedLesson(lesson.id)();
    setShowBackButton(true);
    setIsAnswerCorrect(true);
    setIsCorrect(true);
    let successLessonCodeButton1 = document.getElementById("successCodeLesson");
    if (successLessonCodeButton1) {
      successLessonCodeButton1.style.display = "none";
    }
  }, [lesson.id, progressSavingEnabled]);

  const checkAnswerCode = useCallback(() => {
    const userAnswer = String(code).replace(/\s/g, "");
    const correctAnswer = String(lesson.correctAnswer).replace(/\s/g, "");

    const similarity = calculateSimilarity(userAnswer, correctAnswer) * 100;
    setSimilarity(similarity);
    if (similarity >= 85) {
      setIsAnswerCorrect(true);
      setIsCorrect(true);
      saveCompletedLesson(lesson.id)();
    } else {
      setIsAnswerCorrect(false);
    }
    setShowSolution(true);
  }, [
    code,
    lesson.correctAnswer,
    lesson.id,
    calculateSimilarity,
    progressSavingEnabled,
  ]);

  const parseHTML = (html: string) => parse(html);
  const parseContent = (html: string) => parseContentFunction(html);

  return (
    <div>
      {isCorrect === true && (
        <div className="overlay">
          <div className="congratulationAnimation">
            <h1>Gratulation!</h1>
            <div className="rocketAnimation">🚀</div>
            <p>+ {animatedXP} XP</p>
            <p>{`${currentCompletedXP}/${currentTotalXP} XP schon erreicht in dem Kapitel ${lesson.category}!`}</p>{" "}
            {/* Hier haben wir +1 hinzugefügt, weil Sie gerade eine XP verdient haben. */}
            <button className="closeButton" onClick={closeOverlay}>
              &times;
            </button>
          </div>
        </div>
      )}
      <NavbarComponent disabled={false} />
      <div className="after-login-container">
        <Card style={{ width: "100vw" }}>
          <Card.Header as="h2">
            <MdArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            {lesson.title}
            {isAnswerCorrect && (
              <MdCheckCircle
                color="green"
                style={{ marginLeft: "10px", verticalAlign: "middle" }}
              />
            )}
          </Card.Header>
          <Card.Body style={{ height: "auto" }}>
            <Card.Text>{parseContent(lesson.content)}</Card.Text>
            {lesson.exercise !== "" && (
              <>
                <h3>Übung</h3>
                <Card.Text>{parseContent(lesson.exercise)}</Card.Text>
              </>
            )}

            {lesson.quizText !== "" &&
              lesson.quizSolution !== "" &&
              lesson.quizOptions !== "" && (
                <>
                  <Card.Title>{lesson.quizText}</Card.Title>
                  <Form ref={formRef}>
                    {optionsArray.map((option, index) => (
                      <Form.Group key={index} className="mb-3">
                        <Form.Check
                          type="radio"
                          name="quizOption"
                          id={`option-${index}`}
                          value={option}
                          label={option}
                        />
                      </Form.Group>
                    ))}
                    {isCorrect !== null && (
                      <Alert variant={isCorrect ? "success" : "danger"}>
                        {isCorrect ? "Richtig!" : "Leider falsch."}
                      </Alert>
                    )}
                    {!isCorrect && (
                      <Button variant="primary" onClick={checkQuizAnswer}>
                        Überprüfen
                      </Button>
                    )}
                  </Form>

                  <br />
                </>
              )}

            {lesson.exercise !== "" && (
              <>
                {shouldDisplaySolution && (
                  <>
                    <Card.Text>
                      <strong>Das Endergebnis soll wie folgt aussehen:</strong>
                    </Card.Text>
                    <iframe
                      title="Embedded Content"
                      srcDoc={removeHrefLinks(formattedCorrectAnswer)}
                      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                      style={{ width: "70vw" }}
                      onLoad={(event) => {
                        const iframe = event.target as HTMLIFrameElement;
                        const script =
                          iframe.contentDocument?.querySelector("script");
                        if (script && iframe.contentDocument) {
                          const scriptContent = script.textContent;
                          const newScript =
                            iframe.contentDocument.createElement("script");
                          if (iframe.contentDocument.body) {
                            iframe.contentDocument.body.appendChild(newScript);
                          }
                        }
                        if (iframe.contentWindow?.document.body) {
                          const newHeight =
                            iframe.contentWindow.document.body.scrollHeight +
                            3 * window.innerWidth * 0.01; // 2vw in Pixel umrechnen
                          iframe.height = `${newHeight}px`;
                        }
                      }}
                    />
                    <br />
                  </>
                )}
                <br />
                <MonacoEditor
                  width="100%"
                  height="300px"
                  language={lesson.language}
                  theme="vs-dark"
                  value={code}
                  onChange={handleCodeChange}
                />
                <br />
                <Button variant="primary" onClick={checkAnswerCode}>
                  Überprüfen
                </Button>
              </>
            )}
            {lesson.exercise === "" &&
              lesson.quizText === "" &&
              lesson.quizSolution === "" &&
              lesson.quizOptions === "" &&
              progressSavingEnabled &&
              !completed.includes(lesson.id) && (
                <div>
                  {showBackButton === false ? (
                    <Button
                      id="successCodeLesson"
                      variant="success"
                      onClick={checkAnswerWithoutAll}
                    >
                      Abgeschlossen
                    </Button>
                  ) : (
                    <MdArrowBack
                      style={{
                        cursor: "pointer",
                        fontSize: "40px",
                        backgroundColor: "#8BC34A",
                        borderRadius: "5px",
                      }}
                      onClick={() => navigate(-1)}
                    />
                  )}
                </div>
              )}
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
        {showCodeSolution && (
          <Card style={{ width: "100vw" }}>
            <Card.Header as="h2">Lösung</Card.Header>
            <Card.Body style={{ height: "auto" }}>

              <div
                className={`alert ${
                  (similarity ?? 0) >= 85 ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                Ihr Code ist zu {(similarity ?? 0).toFixed(2)}% korrekt!{" "}
                {(similarity ?? 0) >= 85
                  ? "Glückwunsch!"
                  : "Versuchen Sie es erneut."}
              </div>

              <Card.Text>
                Hier wird die Lösung (links) mit Ihrem Code (rechts) verglichen.{" "}
              </Card.Text>
              <MonacoDiffEditor
                width="100%"
                height="300px"
                language={lesson.language}
                theme="vs-dark"
                original={formattedCorrectAnswer}
                value={code}
                options={{
                  readOnly: true,
                  renderSideBySide: true,
                  automaticLayout: true,
                }}
              />
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Lesson;
