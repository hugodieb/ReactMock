import {clickReducer } from './loginReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer 
});