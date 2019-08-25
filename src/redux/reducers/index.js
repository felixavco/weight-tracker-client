import { combineReducers } from 'redux';

import errorReducer from './errorsReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer'



export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  users: usersReducer
});