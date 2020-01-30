import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home/Home'
import UserCrud from '../pages/user/UserCrud'
import UserLogin from '../pages/user/UserLogin'
import Auth from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        Auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/entrar", state: { from: props.location } }} />
        )
        }
    />
)

class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <PrivateRoute path='/users' component={UserCrud} />
                <Route path='/perfil/entrar' component={UserLogin} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

export default Routes