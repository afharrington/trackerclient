import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as burgerMenu} from 'redux-burger-menu';
import authReducer from './authReducer';
import adminProgramsReducer from './adminProgramsReducer';
import adminUserReducer from './adminUserReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
import userProgramReducer from './userProgramReducer';

const rootReducer = combineReducers({
  form: formReducer,
  burgerMenu,
  auth: authReducer,
  adminPrograms: adminProgramsReducer,
  adminUsers: adminUserReducer,
  admin: adminReducer,
  user: userReducer,
  ui: uiReducer,
  userPrograms: userProgramReducer
});

export default rootReducer;
