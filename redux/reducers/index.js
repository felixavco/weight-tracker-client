import { combineReducers } from 'redux';

import errorReducer from './errorsReducer';
import authReducer from './authReducer';



export default combineReducers({
  errors: errorReducer,
  auth: authReducer
});