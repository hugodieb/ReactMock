import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {    
    const logged = JSON.parse(localStorage.getItem('isAuthenticated')) || false
  
    return (
        <Route
            {...rest}
            render={props =>
                logged ? <Component {...props} /> : <Redirect to={{ pathname: "perfil/entrar", state: { from: props.location } }} />
            }
        />
    )
}

export default PrivateRoute