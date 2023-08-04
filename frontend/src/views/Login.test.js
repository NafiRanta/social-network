import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from './Login';

describe('Login component', () => {
    test('validLoginForm should return false when email is empty', () => {
        render(<Login />);
      
        const emailInput = screen.getByTestId('loginEmail')
        fireEvent.change(emailInput, { target: { value: '' } });
      
        const passwordInput = screen.getByTestId('loginPassword');
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      
        const loginButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.click(loginButton);
      
        const errorMessage = screen.getByText('Email is required');
        expect(errorMessage).toBeInTheDocument();
      });
    test('validLoginForm should return false when email is in an invalid format', () => {
    render(<Login />);
    
    const emailInput = screen.getByTestId('loginEmail');
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    
    const passwordInput = screen.getByTestId('loginPassword');
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText('Invalid email format');
    expect(errorMessage).toBeInTheDocument();
    });
    
    test('validLoginForm should return false when password is empty', () => {
    render(<Login />);
    
    const emailInput = screen.getByTestId('loginEmail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText('Password is required');
    expect(errorMessage).toBeInTheDocument();
    });
    
    test('validLoginForm should return false when password is in an invalid format', () => {
        render(<Login />);
          
        const emailInput = screen.getByTestId('loginEmail');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        const passwordInput = screen.getByTestId('loginPassword');
        // Test case: Password less than 5 characters
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        // Test case: Password without an uppercase letter
        fireEvent.change(passwordInput, { target: { value: 'password123!' } });
        // Test case: Password without a lowercase letter
        fireEvent.change(passwordInput, { target: { value: 'PASSWORD123!' } });
      
        const loginButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.click(loginButton);
      
        const errorMessage = screen.getByText((content, element) => {
          // Use a custom matcher function to match the error message
          const hasText = (text) => element.textContent === text;
          return (
            hasText('Invalid password format') ||
            hasText('Password must contain at least one uppercase letter') ||
            hasText('Password must contain at least one lowercase letter') ||
            hasText('Password must be at least 5 characters long')
          );
        });
        
        expect(errorMessage).toBeInTheDocument();
      });
      
    
    test('validLoginForm should return true when form inputs are valid', () => {
    render(<Login />);
    
    const emailInput = screen.getByTestId('loginEmail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const passwordInput = screen.getByTestId('loginPassword');
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.queryByText(/(Email is required|Invalid email format|Password is required|Invalid password format)/i);
    expect(errorMessage).not.toBeInTheDocument();
    });
    });
