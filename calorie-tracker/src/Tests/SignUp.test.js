import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';

import userReducer from '../Features/users/userSlice';
import SignUp from '../Pages/SignUp';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

test('Renders SignUp component and validates form fields', () => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );
  
    const signUpHeading = screen.getByRole('heading', { name: /Sign Up/i });
    const emailInput = screen.getByLabelText(/Your email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
  
    expect(signUpHeading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });
  
    fireEvent.click(signUpButton);
});
