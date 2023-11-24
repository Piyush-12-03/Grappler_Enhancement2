import React from 'react';
import ReactDOM from 'react-dom'; // Import 'ReactDOM' from 'react-dom' directly
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
