import * as types from '../actions/actionTypes'

//const template = JSON.parse(localStorage.getItem('template')) || {}   

export const templateDetailReducer = (state, action) => {         
    switch (action.type) {
        case types.TEMPLATE_DETAIL:            
            //localStorage.setItem('template', JSON.stringify(action.template))
            //Object.assign(template, action.template)
            return {
                ...state,       
                response: action.template
        }
        default:
            return {
                response: state
            }
    }
}