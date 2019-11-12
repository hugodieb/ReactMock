import { clickReducer } from './clickReducer'
import { authReducer } from './authReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  authLogin: authReducer
});