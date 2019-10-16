import { CLICK_UPDATE_VALUE, USER_AUTH } from './actionTypes';

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});

export const loginButton = value => ({
  type: USER_AUTH,
  authenticated: value
});