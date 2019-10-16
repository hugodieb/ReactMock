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
                <img className="rounded-circle"
                 src="https://www.dinheirovivo.pt/wp-content/uploads/2018/08/Mark-Zuckerberg-1024x594.jpg"
                  alt="logo"
                  width="60" height="60" />
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