import { CLICK_UPDATE_VALUE, USER_AUTH } from '../actions/actionTypes';

const initialState = {
  newValue: 'Atualizado via redux!',
  authenticated: true
};

export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      console.log('clickreducer')      
      return {
        ...state,
        newValue: action.newValue        
      };
    case USER_AUTH:
      console.log('loginreducer')      
      return {
        ...state,        
        authenticated: !state.authenticated
      };
    default:
      return state;
  }
}
