import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';import logger from 'redux-logger';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { LOGIN_ADMIN, LOGIN_USER } from './actions/authActions';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);

// Keeps user logged in if there is a token in local storage
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (token && role === 'admin') {
  store.dispatch({ type: LOGIN_ADMIN });
} else if (token && role === 'user') {
  store.dispatch({ type: LOGIN_USER });
}

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
