import * as types from '../actions/actionTypes'

const currentUser = {}

export const setCurrentUserReducer = (state = {...currentUser}, action) => {   
  switch (action.type) {
    case types.SET_USER:      
      Object.assign(currentUser, action.user)                    
      return {
        ...state,       
        response: action.user
      }
    default:
      return {response: state}    
  }
}

export const removeCurrentUserReducer = (state = {...currentUser}, action) => { 
  switch (action.type) {
    case types.REMOVE_USER:      
      Object.keys(currentUser).forEach(function(key) { delete currentUser[key]; });                  
      return {
        ...state,       
        response: state
      }
    default:
      return {response: state}    
  }
}

export const currentUserReducer = (state, action) => { 
  state = Object.keys(currentUser).length !== 0 ? {...currentUser} : null
  switch (action.type) {
    case types.CURRENT_USER:                   
      return {
        ...state,       
        response: state
      }      
    default:      
      return {response: state}
  }
}