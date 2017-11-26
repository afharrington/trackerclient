import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as burgerMenu} from 'redux-burger-menu';
import authReducer from './authReducer';
import adminRegimensReducer from './adminRegimensReducer';
import adminUserReducer from './adminUserReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  form: formReducer,
  burgerMenu,
  auth: authReducer,
  adminRegimens: adminRegimensReducer,
  adminUsers: adminUserReducer,
  admin: adminReducer,
  user: userReducer,
  ui: uiReducer
});

export default rootReducer;
