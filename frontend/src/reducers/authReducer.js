import * as types from '../actions/actionTypes'
//import AppApi from '~apijs'

export const authReducer = (state = {}, action) => {
  const response = action.user
  switch (action.type) {
    case types.USER_AUTH:          
      return {
        ...state,       
        response
      }
    default:
      return state
  }
}