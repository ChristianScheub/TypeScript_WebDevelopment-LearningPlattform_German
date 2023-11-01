import React from 'react';
import { Form, Alert, Button, Card } from 'react-bootstrap';

interface QuizComponentProps {
  lesson: {
    quizText: string;
    quizSolution: string;
    quizOptions: string;
  };
  isCorrect: boolean | null;
  checkQuizAnswer: () => void;
  formRef: React.RefObject<HTMLFormElement>;
  optionsArray: string[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  lesson,
  isCorrect,
  checkQuizAnswer,
  formRef,
  optionsArray,
}) => {
  if (
    !lesson.quizText ||
    !lesson.quizSolution ||
    !lesson.quizOptions
  ) {
    return null;
  }

  

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
        {isCorrect !== null && (
          <Alert variant={isCorrect ? 'success' : 'danger'}>
            {isCorrect ? 'Richtig!' : 'Leider falsch.'}
          </Alert>
        )}
        {!isCorrect && (
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
