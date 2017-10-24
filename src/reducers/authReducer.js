import { AUTH_ERROR, REGISTER_ADMIN, CREATE_ADMIN, LOGIN_ADMIN, LOGOUT_ADMIN, REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../actions/authActions';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_ERROR:
      return {...state, error: action.payload };
    case REGISTER_ADMIN:
      return {...state, error: '', name: action.payload, authenticated: true, userType: 'admin' };
    case CREATE_ADMIN:
      return {...state, error: '', name: action.payload, authenticated: true, userType: 'admin' };
    case LOGIN_ADMIN:
      return {...state, error: '', name: action.payload, authenticated: true, userType: 'admin' };
    case LOGOUT_ADMIN:
      return {...state, authenticated: false, userType: '' };
    case REGISTER_USER:
      return {...state, error: '', name: action.payload, authenticated: true, userType: 'user' };
    case LOGIN_USER:
      return {...state, error: '', name: action.payload, authenticated: true, userType: 'user' };
    case LOGOUT_USER:
      return {...state, authenticated: false, userType: '' };
    default:
      return state;
  }
}
