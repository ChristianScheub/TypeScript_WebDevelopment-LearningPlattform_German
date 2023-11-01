import React from 'react';
import { Form, Alert, Button, Card } from 'react-bootstrap';

interface QuizComponentProps {
  lesson: {
    quizText: string;
    quizSolution: string;
    quizOptions: string;
  };
  showCongratulationsOverlay: boolean | null;
  checkQuizAnswer: () => void;
  formRef: React.RefObject<HTMLFormElement>;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  lesson,
  showCongratulationsOverlay,
  checkQuizAnswer,
  formRef,
}) => {
  if (
    !lesson.quizText ||
    !lesson.quizSolution ||
    !lesson.quizOptions
  ) {
    return null;
  }

  const optionsArray = lesson.quizOptions
    .split(";")
    .filter((option) => option !== "");

  

  return (
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
        {showCongratulationsOverlay !== null && (
          <Alert variant={showCongratulationsOverlay ? 'success' : 'danger'}>
            {showCongratulationsOverlay ? 'Richtig!' : 'Leider falsch.'}
          </Alert>
        )}
        {!showCongratulationsOverlay && (
          <Button variant="primary" onClick={checkQuizAnswer}>
            Überprüfen
          </Button>
        )}
      </Form>
      <br />
      <br />
    </>
  );
};

export default QuizComponent;
