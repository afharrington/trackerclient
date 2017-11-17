import axios from 'axios';
import uri from '../config/uri.js';

export const AUTH_ERROR = 'auth_error';
export const REGISTER_ADMIN = 'register_admin';
export const CREATE_ADMIN = 'create_admin';
export const LOGIN_ADMIN = 'login_admin';
export const LOGOUT_ADMIN= 'logout_admin';
export const REGISTER_USER = 'register_user';
export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';

const ROOT = uri.rootUri;

// AUTH_ERROR
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

// CREATE_ADMIN
export function createAdmin({ firstName, lastName, email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin`, { firstName, lastName, email, password })
      .then(response => {
        dispatch({ type: CREATE_ADMIN, payload: response.data.firstName });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', 'admin');
      })
      .then(() => callback()) // redirect
      .catch((err) => {
        console.log(err);
      });
  }
}

// REGISTER_ADMIN
export function registerAdmin(values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/register`, values)
      .then(response => {
        dispatch({ type: REGISTER_ADMIN, payload: response.data.firstName });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', 'admin');
      })
      .then(() => callback()) // redirect
      .catch((err) => {
        console.log(err);
      });
  }
}

// LOGIN_ADMIN
export function loginAdmin({ email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/login`, { email, password})
      .then(response => {
        dispatch({ type: LOGIN_ADMIN, payload: response.data.firstName });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', 'admin');
      })
      .then(() => callback()) // redirect
      .catch((err) => {
        dispatch(authError('Incorrect email or password'));
      });
  }
}

// LOGOUT_ADMIN
export function logoutAdmin() {
  localStorage.removeItem('token');
  return { type: LOGOUT_ADMIN };
}

// LOGIN_USER
export function loginUser({email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/user/login`, { email, password})
      .then(response => {
        console.log(response.data);
        dispatch({ type: LOGIN_USER, payload: response.data.firstName });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', 'user');
      })
      .then(() => callback()) // redirect
      .catch(() => {
        dispatch(authError('Incorrect email or password'));
      });
  }
}

// REGISTER_USER
export function registerUser(values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/user/register`, values)
      .then(response => {
        dispatch({ type: REGISTER_USER, payload: response.data.firstName });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('role', 'user');
      })
      .then(() => callback()) // redirect
      .catch((err) => {
        console.log(err);
      });
  }
}

// LOGOUT_USER
export function logoutUser() {
  localStorage.removeItem('token');
  return { type: LOGOUT_USER };
}
