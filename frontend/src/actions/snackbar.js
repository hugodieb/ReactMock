import * as types from './actionTypes';

export const snackbarOpen = (snack_data) => ({
    type: types.TOAST_OPEN,
    snack_data: snack_data
})

export const snackbarClose = () => ({
    type: types.TOAST_CLOSE    
})