import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import adminRegimensReducer from './adminRegimensReducer';
import adminUserReducer from './adminUserReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  adminRegimens: adminRegimensReducer,
  adminUsers: adminUserReducer,
  user: userReducer
});

export default rootReducer;
