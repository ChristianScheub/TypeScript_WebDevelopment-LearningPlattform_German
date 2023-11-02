import '@testing-library/jest-dom'; 
import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import CongratulationsOverlay from './sucessAnimation'; 

describe('CongratulationsOverlay when User have an lesson done', () => {
    it('renders without crashing', () => {
      const mockProps = {
        lessonCategory: 'Math',
        closeOverlay: jest.fn(),
      };
  
      render(<CongratulationsOverlay {...mockProps} />);
      expect(screen.getByText(/Gratulation!/i)).toBeInTheDocument();  // Updated this line

    });
  
    it('calls closeOverlay function when close button is clicked', () => {
      const mockCloseOverlay = jest.fn();
      const mockProps = {
        lessonCategory: 'Math',
        closeOverlay: mockCloseOverlay,
      };
  
      render(<CongratulationsOverlay {...mockProps} />);
      fireEvent.click(screen.getByText('×'));
      expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
    });
  
    it('animates XP value correct', async () => {
      const mockProps = {
        lessonCategory: 'Allgemeine Webentwicklung',
        closeOverlay: jest.fn(),
      };
  
      render(<CongratulationsOverlay {...mockProps} />);
      await act(async () => {
        await new Promise(r => setTimeout(r, 2000));
      });
      expect(screen.getByText(/\+ \d+ XP/i)).toBeInTheDocument(); 
    });
  });
