import * as types from './actionTypes';

export const loginUserAction = (user) => ({
    type: types.USER_AUTH,    
    user: user
})