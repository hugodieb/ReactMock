import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home/Home'
import UserProfile from '../pages/user/UserProfile'
import UserLogin from '../pages/user/UserLogin'
import Detail from '../pages/detail/Detail'
import NewCart from '../pages/cart/NewCart'
import Success from '../pages/cart/success/Success'
import Cancel from '../pages/cart/cancel/Cancel'
import { isUser, authentication } from '../services/auth'

import { connect } from 'react-redux'
import { setCurrentUserAction } from '../actions/auth'
import PrivateRoute from './PrivateRoutes'

class Routes extends Component {
    componentWillMount() {
        console.log('routes')                 
        authentication().then(() => {
            const user = isUser()._user                             
            this.props.dispatch(setCurrentUserAction(user))
        })              
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



export default connect(mapDispatchToProps)(Routes)