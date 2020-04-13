import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home/Home'
import UserCrud from '../pages/user/UserCrud'
import UserProfile from '../pages/user/UserProfile'
import UserLogin from '../pages/user/UserLogin'
import Detail from '../pages/detail/Detail'
import NewCart from '../pages/cart/NewCart'
import Auth from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
        
    return (
        <Route
            {...rest}
            render={props =>
            Auth.isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: "perfil/entrar", state: { from: props.location } }} />
            }
        />
    )
}

class Routes extends Component {       

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <PrivateRoute path='/users' component={UserCrud} />                
                <Route path='/perfil/entrar' component={UserLogin} />
                <PrivateRoute path='/perfil/' component={UserProfile} />
                <Route path='/template/:name' component={Detail} />
                <Route path='/carrinho' component={NewCart} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

export default Routes