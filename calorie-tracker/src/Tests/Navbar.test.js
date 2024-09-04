import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Navbar from '../Components/Navbar';
import userReducer, { logout as logoutAction } from '../Features/users/userSlice';

jest.mock('../Context/UserContext.js', () => ({
  useUserContext: jest.fn(),
}));

const { useUserContext } = require('../Context/UserContext');

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

describe('Navbar Component', () => {
  const mockLogout = jest.fn();
  const mockToastSuccess = jest.fn();
  toast.success = mockToastSuccess;

  const renderComponent = (user, isAuthenticated) => {
    useUserContext.mockReturnValue({
      user,
      logout: mockLogout,
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderComponent(null, false);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('It will display login and signup buttons when user is not authenticated', () => {
    renderComponent(null, false);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
});
