import AppApi from '~apijs'

const user = {
    authenticated: false,
    _user: undefined   
}

export const authentication = () => {
    return (
        AppApi.whoami().then(response => {                                         
            user.authenticated = response.authenticated
            user._user = response.user ? response.user : null
            localStorage.setItem('isAuthenticated', user.authenticated)
        })
    )
}

export const isAuthenticated = () => {
    return user.authenticated
}

export const isUser = () => {
    return user
}