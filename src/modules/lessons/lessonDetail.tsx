import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";


import NavbarComponent from "../../base/navbarComponent";

import CongratulationsOverlay from "./sucessAnimation";
import QuizComponent from "./lessonDetailQuiz";
import CodeEditor from "./lesssonDetailCodeExercise";
import CodeComparison from "./lessonDetailCodeComparison";
import "./lessonDetail.css";
import {
  saveCompletedLesson,
} from "../dashboard/categoryProgress";

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
  const [similarity, setSimilarity] = useState<number | null>(null);
  const optionsArray = lesson.quizOptions
    .split(";")
    .filter((option) => option !== "");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const closeOverlay = () => {
    setIsCorrect(null);
  };

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
  }, [lesson.quizSolution, lesson.id]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);





  const checkAnswerWithoutAll = useCallback(() => {
    saveCompletedLesson(lesson.id)();
    setShowBackButton(true);
    setIsAnswerCorrect(true);
    setIsCorrect(true);
    let successLessonCodeButton1 = document.getElementById("successCodeLesson");
    if (successLessonCodeButton1) {
      successLessonCodeButton1.style.display = "none";
    }
  }, [lesson.id]);

  const checkAnswerCode = useCallback(() => {
    console.log("LOL");
    const userAnswer = String(code).replace(/\s/g, "");
    const correctAnswer = String(lesson.correctAnswer).replace(/\s/g, "");

    const similarity = calculateSimilarity(userAnswer, correctAnswer) * 100;
    setSimilarity(similarity);
    console.log(similarity);
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
  ]);

  const parseContent = (html: string) => parseContentFunction(html);

  return (
    <div>
      {isCorrect === true && (
        <CongratulationsOverlay
          lessonCategory={lesson.category}
          closeOverlay={closeOverlay}
        />
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

            <QuizComponent
              lesson={lesson}
              isCorrect={isCorrect}
              checkQuizAnswer={checkQuizAnswer}
              formRef={formRef}
              optionsArray={optionsArray}
            />

            <CodeEditor
              lesson={lesson}
              showSolution={lesson.showDisplaySolution === "true"}
              codeSolution={lesson.correctAnswer}
              code={code}
              handleCodeChange={handleCodeChange}
              checkAnswerCode={checkAnswerCode}
            />

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
        <CodeComparison
          similarity={similarity}
          lessonLanguage={lesson.language}
          codeSolution={lesson.correctAnswer}
          showCodeSolution = {showCodeSolution}
          code={code}
        />
      </div>
    </div>
  );
};

export default Lesson;