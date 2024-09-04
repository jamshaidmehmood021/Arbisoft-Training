import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import foodReducer from '../Features/Food/foodSlice';
import Home from '../Pages/Home';

jest.mock('react-loading-icons', () => ({
  Bars: () => <div>Loading...</div>,
}));

const store = configureStore({
  reducer: {
    foods: foodReducer,
  },
});

describe('It will check the Rendering Home Component For testing purpose', () => {
  test('Render the loading state based on the response type', () => {
    store.dispatch({ type: 'foods/fetchFoods/pending' });
    
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('It will Renders food entries grouped by the dates', async () => {
    store.dispatch({
      type: 'foods/fetchFoods/fulfilled',
      payload: [
        { id: 1, foodName: 'Apple', calories: 52, dateTime: '2024-09-01T12:00', username: 'testUser' },
        { id: 2, foodName: 'Banana', calories: 89, dateTime: '2024-09-01T13:00', username: 'testUser' },
        { id: 3, foodName: 'Carrot', calories: 41, dateTime: '2024-09-02T08:00', username: 'testUser' },
      ],
    });
  
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  
    const dates = await screen.findAllByText(/9\/1\/2024/i);
    expect(dates.length).toBe(3); 
  
    expect(screen.getByText(/Total Calories: 141.00/i)).toBeInTheDocument();
    expect(await screen.findByText(/Apple/i)).toBeInTheDocument();
    expect(await screen.findByText(/Banana/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Calories: 41.00/i)).toBeInTheDocument();
    expect(await screen.findByText(/Carrot/i)).toBeInTheDocument();
  });  

  test('Testing for rendering the warning if calorie limit exceeds', async () => {
    store.dispatch({
      type: 'foods/fetchFoods/fulfilled',
      payload: [
        { id: 1, foodName: 'Apple', calories: 0.10, dateTime: '2024-09-01T12:00', username: 'testUser' },
        { id: 2, foodName: 'Banana', calories: 11, dateTime: '2024-09-01T13:00', username: 'testUser' },
        { id: 3, foodName: 'Carrot', calories: 0.870, dateTime: '2024-09-02T08:00', username: 'testUser' },
      ],
    });
  
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  
    const redWarnings = await screen.findAllByText(/Exceeds daily limit/i);
    expect(redWarnings.length).toBe(1);
    expect(redWarnings[0]).toHaveClass('text-red-600');
  
  });  
});
