import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';

import userReducer from '../Features/users/userSlice';
import LogIn from '../Pages/LogIn';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

test('Renders LogIn component and validates form fields and check submit action', () => {
    render(
      <Provider store={store}>
        <Router>
          <LogIn />
        </Router>
      </Provider>
    );

    const logInHeading = screen.getByText(/Log In/i);
    const emailInput = screen.getByLabelText(/Your email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    expect(logInHeading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(signInButton);
});
