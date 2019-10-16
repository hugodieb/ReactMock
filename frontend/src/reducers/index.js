import { clickReducer } from './loginReducer'
import { authReducer } from './authReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  authLogin: authReducer
});