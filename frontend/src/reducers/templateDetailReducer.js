import * as types from '../actions/actionTypes'

const template = {
    "id": "",
    "thumbnails": [],
    "originals": [],
    "title": "",
    "sku": "",
    "price": "",
    "pricePay": "",
    "discount": "",    
    "descrption": ""
}

export const templateDetailReducer = (state, action) => {          
    switch (action.type) {
        case types.TEMPLATE_DETAIL:
            Object.assign(template, action.template)
            return {
                ...state,       
                response: template
        }
        default:
            return {
                response: template
            }
    }
}