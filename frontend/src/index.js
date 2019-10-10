import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import { Provider } from 'react-redux';
import { Store } from './store';
import serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker();