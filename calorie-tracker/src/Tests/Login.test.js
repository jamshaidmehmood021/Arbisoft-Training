import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/users/userSlice';
import LogIn from '../Pages/LogIn';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

test('renders LogIn component and validates form fields', () => {
    render(
      <Provider store={store}>
        <Router>
          <LogIn />
        </Router>
      </Provider>
    );
  
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  
    fireEvent.change(screen.getByLabelText(/Your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
  
  });
