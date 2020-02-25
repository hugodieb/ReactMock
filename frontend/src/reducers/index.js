import { clickReducer } from './clickReducer'
import { authReducer } from './authReducer'
import { snackbarReducer } from './snackbarReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  authLogin: authReducer,
  snackbar: snackbarReducer
});