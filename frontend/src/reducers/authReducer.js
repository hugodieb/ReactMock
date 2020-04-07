import * as types from '../actions/actionTypes'

export const currentUser = {}

export const setCurrentUserReducer = (state = {...currentUser}, action) => {      
  switch (action.type) {
    case types.SET_USER:      
      Object.assign(currentUser, action.user)                    
      return {
        ...state,       
        response: state
      }
    default:
      return state
  }
}

export const removeCurrentUserReducer = (state = {...currentUser}, action) => {    
  switch (action.type) {
    case types.REMOVE_USER:      
      Object.assign(currentUser, action.user)                    
      return {
        ...state,       
        response: state
      }
    default:
      return state
  }
}

export const currentUserReducer = (state, action) => { 
  state = Object.keys(currentUser).length != 0 ? {...currentUser} : null   
  switch (action.type) {
    case types.CURRENT_USER:                   
      return {
        ...state,       
        response: state
      }
      break
    default:
      return {response: state}
  }
}