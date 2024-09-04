import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import foodReducer from '../Features/Food/foodSlice';
import EditFoodEntry from '../Pages/EditFoodEntry';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ foodId: '1' }),
  useNavigate: () => jest.fn(),
}));

const store = configureStore({
  reducer: {
    foods: foodReducer,
  },
});

describe('EditFoodEntry Component Rendering and testing', () => {
  beforeEach(() => {
    store.dispatch({
      type: 'foods/fetchFoods/fulfilled',
      payload: [{
        id: 1,
        foodName: 'Apple',
        calories: 52,
        dateTime: '2024-09-01T12:00',
        username: 'testUser'
      }],
    });
  });

  test('It will validate the required fields and updates food entry', async () => {
    render(
      <Provider store={store}>
        <Router>
          <EditFoodEntry />
          <ToastContainer />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Food\/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date\/Time/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Food\/Product Name/i).value).toBe('Apple');
    expect(screen.getByLabelText(/Date\/Time/i).value).toBe('2024-09-01T12:00');

    fireEvent.change(screen.getByLabelText(/Food\/Product Name/i), { target: { value: 'Banana' } });
    fireEvent.change(screen.getByLabelText(/Date\/Time/i), { target: { value: '2024-09-02T12:00' } });

    fireEvent.click(screen.getByText(/Save Changes/i));

    expect(screen.getByLabelText(/Food\/Product Name/i).value).toBe('Banana');
    expect(screen.getByLabelText(/Date\/Time/i).value).toBe('2024-09-02T12:00');
  });
});
