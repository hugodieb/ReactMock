import './Nav.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import logo from '../../assets/imgs/lobo.png'

class Nav extends Component {
    render () {
        return (
            <aside className="menu-area">
            <nav className="menu">
                {/* Refatorar em casa! */}               
                <Link to="/">
                    <i className="fa fa-home"></i> Início
                </Link>
                <Link to="/users">
                    <i className="fa fa-users"></i> Usuários
                </Link>
            </nav>
        </aside>
        )        
    }    
}

export default Nav