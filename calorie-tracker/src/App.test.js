import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './Store/store'; 
import App from './App'; 

test('renders learn react link', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
