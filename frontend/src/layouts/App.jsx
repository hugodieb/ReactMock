import './App.sass'
import React from 'react'
import Routes from './Routes'
import Nav from '@components/navbar/Nav'
import Snackbar from '@components/Snackbar'

import { BrowserRouter } from 'react-router-dom'


export default props =>
    <BrowserRouter>        
        <div className="app">           
            <Nav/>
            <Routes/>
            <Snackbar />                   
        </div>
    </BrowserRouter>