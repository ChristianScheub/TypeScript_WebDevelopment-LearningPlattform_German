import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LessonOverview from './lessonOverview';

describe('<LessonOverview />', () => {
    const mockLessons = [
        {
            id: '1',
            title: 'Test Lesson 1',
            description: 'Description 1',
            content: 'Content 1',
            exercise: 'Exercise 1',
            correctAnswer: 'Answer 1',
        },
        {
            id: '2',
            title: 'Test Lesson 2',
            description: 'Description 2',
            content: 'Content 2',
            exercise: 'Exercise 2',
            correctAnswer: 'Answer 2',
        }
    ];

    it('renders without crashing', () => {
        render(
            <Router>
                <LessonOverview lessons={mockLessons} title="Test Title" />
            </Router>
        );
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('displays a list of lessons', () => {
        render(
            <Router>
                <LessonOverview lessons={mockLessons} title="Test Title" />
            </Router>
        );
        expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();

        expect(screen.getByText('Test Lesson 2')).toBeInTheDocument();
        expect(screen.getByText('Description 2')).toBeInTheDocument();

    });

    it('displays check icon for completed lessons', () => {
        const completedLessons = JSON.stringify(['1']);  // assuming lesson with id '1' is completed
        localStorage.setItem('completedLessons', completedLessons);

        render(
            <Router>
                <LessonOverview lessons={mockLessons} title="Test Title" />
            </Router>
        );

        const checkIcon = screen.queryByTestId('check-icon');
        expect(checkIcon).toBeInTheDocument();
    });

    test('navigates to lesson page on card click', () => {        
        render(
            <Router>
                <LessonOverview lessons={mockLessons} title="Test Title" />
            </Router>
        );        
        const lessonLinkDiv = screen.getByTestId('lesson-link-1');
        fireEvent.click(lessonLinkDiv);
        
        expect(window.location.href).toContain('/1');
      });
});
