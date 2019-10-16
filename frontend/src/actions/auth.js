import { USER_AUTH } from './actionTypes';

export const loginButton = value => ({
    type: USER_AUTH,
    authenticated: value
})