import * as types from '../actions/actionTypes'
//import AppApi from '~apijs'

export const currentUser = {}

export const setCurrentUser = (state = {...currentUser}, action) => {    
  switch (action.type) {
    case types.USER_AUTH:      
      Object.assign(currentUser, action.user)                    
      return {
        ...state,       
        response: state
      }
    default:
      return state
  }
}