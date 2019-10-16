import { USER_AUTH } from '../actions/actionTypes'

const initialState = {
  authenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH:
      console.log('loginreducer')      
      return {
        ...state,        
        authenticated: !state.authenticated
      }
    default:
      return state
  }
}