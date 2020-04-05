import * as types from './actionTypes';

export const currentUserAction = () => ({
    type: types.CURRENT_USER  
})

export const setCurrentUserAction = (user) => ({
    type: types.SET_USER,    
    user: user
})

export const removeCurrentUserAction = (user) => ({
    type: types.REMOVE_USER,    
    user: user
})
