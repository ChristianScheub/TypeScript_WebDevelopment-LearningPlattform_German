import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import CongratulationsOverlay from "./sucessAnimation";
import QuizComponent from "./lessonDetailQuiz";
import CodeEditor from "./lesssonDetailCodeExercise";
import CodeComparison from "./lessonDetailCodeComparison";
import "./lessonDetail.css";
import { saveCompletedLesson } from "../dashboard/categoryProgress";


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
  const navigate = useNavigate();

  const [similarity, setSimilarity] = useState<number | null>(null);
  const [code, setCode] = useState("");

  const [showCongratulationsOverlay, setShowCongratulationsOverlay] = useState<boolean | null>(null);
  const [showCodeSolution, setShowCodeSolution] = useState(false);

  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("completedLessons") || "[]").includes(lesson.id)) {
      setIsAnswerCorrect(true);
    }
  }, [lesson.id]);

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


  const courseDone = useCallback(() => {
    saveCompletedLesson(lesson.id)();
    setIsAnswerCorrect(true);
    setShowCongratulationsOverlay(true);
  }, [lesson.id]);

  const checkQuizAnswer = useCallback(() => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const selectedOption = formData.get("quizOption") as string;
      if (selectedOption === lesson.quizSolution) {
        courseDone();
      }
      else {
        setShowCongratulationsOverlay(false);
      }
    }
  }, [lesson.quizSolution, courseDone]);

  const courseDoneWithoutExercise = useCallback(() => {
    courseDone();
    let successLessonCodeButton1 = document.getElementById("successCodeLesson");
    if (successLessonCodeButton1) {
      successLessonCodeButton1.style.display = "none";
    }
  }, [courseDone]);

  const checkAnswerCode = useCallback(() => {
    const userAnswer = String(code).replace(/\s/g, "");
    const correctAnswer = String(lesson.correctAnswer).replace(/\s/g, "");
    const similarity = calculateSimilarity(userAnswer, correctAnswer) * 100;

    setSimilarity(similarity);
    console.log(similarity);
    if (similarity >= 85) {
      courseDone();
    } else {
      setIsAnswerCorrect(false);
    }
    setShowCodeSolution(true);
  }, [
    code,
    lesson.correctAnswer,
    courseDone,
    calculateSimilarity,
  ]);


  return (
    <div>
      {showCongratulationsOverlay === true && (
        <CongratulationsOverlay
          lessonCategory={lesson.category}
          closeOverlay={() => setShowCongratulationsOverlay(null)}
        />
      )}
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
            <Card.Text>{parseContentFunction(lesson.content)}</Card.Text>
            {lesson.exercise !== "" && (
              <>
                <h3>Übung</h3>
                <Card.Text>{parseContentFunction(lesson.exercise)}</Card.Text>
              </>
            )}

            <QuizComponent
              lesson={lesson}
              showCongratulationsOverlay={showCongratulationsOverlay}
              checkQuizAnswer={checkQuizAnswer}
              formRef={formRef}
            />

            <CodeEditor
              lesson={lesson}
              showSolution={lesson.showDisplaySolution === "true"}
              codeSolution={lesson.correctAnswer}
              code={code}
              handleCodeChange={setCode}
              checkAnswerCode={checkAnswerCode}
            />

            {lesson.exercise === "" &&
              lesson.quizText === "" &&
              lesson.quizSolution === "" &&
              lesson.quizOptions === "" &&
              localStorage.getItem("progress-saving-enabled") === "true" && (
                <div>
                  {isAnswerCorrect === false ? (
                    <Button
                      id="successCodeLesson"
                      variant="success"
                      onClick={courseDoneWithoutExercise}
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
          showCodeSolution={showCodeSolution}
          code={code}
        />
      </div>
    </div>
  );
};

export default Lesson;