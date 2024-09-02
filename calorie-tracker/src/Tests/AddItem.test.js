import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../Features/Food/foodSlice';
import AddItem from '../Pages/AddItem';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({
  reducer: {
    foods: foodReducer,
  },
});

describe('AddItem Component', () => {
  test('validates required fields and adds food', () => {
    render(
      <Provider store={store}>
        <Router>
          <AddItem />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByLabelText(/Food\/Product Name/i)).toBeRequired();
    expect(screen.getByLabelText(/Date\/Time/i)).toBeRequired();

    fireEvent.change(screen.getByLabelText(/Food\/Product Name/i), { target: { value: 'Apple' } });
    fireEvent.change(screen.getByLabelText(/Date\/Time/i), { target: { value: '2024-09-01T12:00' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.queryByLabelText(/Food\/Product Name/i)).not.toBeInvalid();
    expect(screen.queryByLabelText(/Date\/Time/i)).not.toBeInvalid();
  });
});
