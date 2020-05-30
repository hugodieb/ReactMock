import { clickReducer } from './clickReducer'
import { currentUserReducer, setCurrentUserReducer, removeCurrentUserReducer } from './authReducer'
import { snackbarReducer } from './snackbarReducer'
import { templateDetailReducer } from './templateDetailReducer'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  setCurrentUser: setCurrentUserReducer,
  removeCurrentUser: removeCurrentUserReducer,
  currentUser: currentUserReducer,  
  snackbar: snackbarReducer,
  templateDetail: templateDetailReducer
});