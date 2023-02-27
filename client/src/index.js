import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import history from './app/utils/history';
import store from './redux/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
