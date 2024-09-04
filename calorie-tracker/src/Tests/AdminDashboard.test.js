import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

import AdminDashboard from '../Pages/AdminDashboard';

const mockStore = configureMockStore([thunk]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

describe('AdminDashboard Rendering', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      foods: {
        foods: [
          { id: 1, foodName: 'Pizza', calories: 300, dateTime: '2024-09-02T12:00:00Z', username: 'user1' },
          { id: 2, foodName: 'Burger', calories: 500, dateTime: '2024-09-02T13:00:00Z', username: 'user2' },
        ],
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve());
  });

  it('Render Admin Dash board and displays food items', async () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminDashboard />
        </Router>
      </Provider>
    );
    await waitFor(() => expect(screen.getByText('Pizza')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Burger')).toBeInTheDocument());
  });

});

