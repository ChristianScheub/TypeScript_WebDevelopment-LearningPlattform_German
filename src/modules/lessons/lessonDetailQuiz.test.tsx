import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizComponent from './lessonDetailQuiz';  

describe('QuizComponent', () => {
  const mockCheckQuizAnswer = jest.fn();
  const formRef = React.createRef<HTMLFormElement>();

  const props = {
    lesson: {
      quizText: 'Was ist die Hauptstadt von Frankreich?',
      quizSolution: 'Paris',
      quizOptions: 'Berlin;Paris;Rom'
    },
    showCongratulationsOverlay: null,
    checkQuizAnswer: mockCheckQuizAnswer,
    formRef: formRef,
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<QuizComponent {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render options correctly', () => {
    render(<QuizComponent {...props} />);
    expect(screen.getByLabelText('Berlin')).toBeInTheDocument();
    expect(screen.getByLabelText('Paris')).toBeInTheDocument();
    expect(screen.getByLabelText('Rom')).toBeInTheDocument();
  });

  it('should call checkQuizAnswer when button is clicked', () => {
    render(<QuizComponent {...props} />);
    fireEvent.click(screen.getByText('Überprüfen'));
    expect(mockCheckQuizAnswer).toHaveBeenCalledTimes(1);
  });
});
