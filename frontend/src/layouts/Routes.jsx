import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home/Home'
import UserProfile from '../pages/user/UserProfile'
import UserLogin from '../pages/user/UserLogin'
import Detail from '../pages/detail/Detail'
import NewCart from '../pages/cart/NewCart'
import Success from '../pages/cart/success/Success'
import Cancel from '../pages/cart/cancel/Cancel'
import { isAuthenticated, isUser, authentication } from '../services/auth'

import { connect } from 'react-redux'
import { setCurrentUserAction } from '../actions/auth'


const PrivateRoute = ({ component: Component, ...rest }) => {    
    return (
        <Route
            {...rest}
            render={props =>
            isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: "perfil/entrar", state: { from: props.location } }} />
            }
        />
    )
}

class Routes extends Component {
    componentWillMount() {
        if(!isAuthenticated()){
            debugger
            authentication().then(() => {
                debugger
                this.props.dispatch(setCurrentUserAction(isUser()._user))
            })
        }             
    }   
    render() {        
        return (
            <Switch>
                <Route exact path='/' component={Home} />                              
                <Route path='/perfil/entrar' component={UserLogin} />
                <PrivateRoute path='/perfil' component={UserProfile} />
                <Route path='/template/:name' component={Detail} />
                <Route path='/sucesso' component={Success} />
                <PrivateRoute path='/cancelamento' component={Cancel} />
                <PrivateRoute path='/carrinho' component={NewCart} />               
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

const mapDispatchToProps = dispatch => {      
    return {
        setCurrentUserAction: user => dispatch(setCurrentUserAction(user)),
    }
  }

export default connect(mapDispatchToProps) (Routes)