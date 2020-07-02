import * as types from '../actions/actionTypes'

const initialState = {}

export const templateDetailReducer = (state=initialState, action) => {
    state = Object.keys(initialState).length !== 0 ? {...initialState} : null   
    switch (action.type) {           
        case types.TEMPLATE_DETAIL:
            Object.assign(initialState, action.template)
            return {
                ...state,       
                template: action.template
            }
        default:
            return {template: state}
    }
}