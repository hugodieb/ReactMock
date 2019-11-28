import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import UserLogin from '@components/user/UserLogin'
import Auth from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        Auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
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
                <Route path='/entrar' component={UserLogin} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

export default Routes