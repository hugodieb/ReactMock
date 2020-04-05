import * as types from './actionTypes';

export const setCurrentUserAction = (user) => ({
    type: types.USER_AUTH,    
    user: user
})