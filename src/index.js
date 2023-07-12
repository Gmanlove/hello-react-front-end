import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
