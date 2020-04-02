import * as types from './actionTypes'

export const templateDetailAction = (template) => ({
    type: types.TEMPLATE_DETAIL,    
    template: template
})