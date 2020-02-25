const initState = {
    'color': '',
    'message': '',
    'timeout': 3000
}

export const snackbarReducer = (state = { ...initState }, action) => {
    let newState = { ...state }
    const data = action.snack_data    
    switch(action.type) {
        case 'TOAST_OPEN':
            newState.color = data.color          
            newState.message = data.message
            newState.timeout = data.timeout || newState.timeout
            return newState
        case 'TOAST_CLOSE':
            newState = { ...initState }
            return newState            
        default:
            return state
    }
}