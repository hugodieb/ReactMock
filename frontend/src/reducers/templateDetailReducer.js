import * as types from '../actions/actionTypes'

export const templateDetailReducer = (state = {}, action) => {    
    const response = action.template
    switch (action.type) {
        case types.TEMPLATE_DETAIL:          
        return {
            ...state,       
            response
        }
        default:
        return state
    }
}