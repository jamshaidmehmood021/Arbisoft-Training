import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Server } from 'miragejs';

new Server({
  routes() {
    this.namespace = "api"

    this.get('/profiles', () => {

      return {
        profiles: [{ id: 1, name: 'Hassam', role: 'Developer', feedback: 'Great service!' },
        { id: 2, name: 'Aleem', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 3, name: 'Jamshaid', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 4, name: 'Ali', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 5, name: 'Aleem', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 6, name: 'Jamshaid', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 7, name: 'Ali', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 8, name: 'Aleem', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 9, name: 'Jamshaid', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 10, name: 'Ali', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 11, name: 'Aleem', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 12, name: 'Jamshaid', role: 'Designer', feedback: 'Very satisfied!' },
        { id: 13, name: 'Ali', role: 'Designer', feedback: 'Very satisfied!' }
        ]
      }


    })
  }

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
