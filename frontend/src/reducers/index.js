import { clickReducer } from './clickReducer'
import { setCurrentUser } from './authReducer'
import { snackbarReducer } from './snackbarReducer'
import { templateDetailReducer } from './templateDetailReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  setCurrentUser: setCurrentUser,
  snackbar: snackbarReducer,
  templateDetail: templateDetailReducer
});