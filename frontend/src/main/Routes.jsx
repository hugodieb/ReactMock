import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import UserLogin from '@components/user/UserLogin'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/entrar' component={UserLogin} />
        <Redirect from='*' to='/' />
    </Switch>