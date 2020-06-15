import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App';
import { Provider } from 'react-redux';
import { Store } from './store';
// import serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));

