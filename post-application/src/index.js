import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './Features/users/userSlice';
import { fetchPosts } from './Features/posts/postSlice';


store.dispatch(fetchUsers())
//  by adding this line when i click the refresh button now my posts will not be updated and go to empty on the single post page
store.dispatch(fetchPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
