import './Nav.css'
import './nav-mobile'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AppApi from '~apijs'
import { loginUserAction } from '../../actions/auth'
import Auth from '../../services/auth'

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {user: null}       
    }
    
    componentDidMount() {        
        this.setState({user: this.props.loggedUser})
    }

    componentDidUpdate(prevProps, prevState) {            
        if(this.props.loggedUser !== prevProps.loggedUser) {
            this.setState({user: this.props.loggedUser})
        }       
    }

    Renderlogin() {
        this.props.history.push('/entrar')
    }

    Renderlogout() {        
        AppApi.logout().then(user => {
            this.props.dispatch(loginUserAction(user))
            Auth.authentication()
            this.props.history.push('/')
        })
    }

    RenderLoginLogout() {        
        if(this.state.user) {
            return (
                <button className="button is-white is-outlined" onClick={() => this.Renderlogout()}>
                    <span className="icon">
                        <i className="fa fa-sign-out"></i>
                    </span>
                    <span >Sair</span>
                </button>                 
            )           
        } else {
            return (
                <button className="button is-white is-outlined" onClick={() => this.Renderlogin()}>
                    <span className="icon">
                        <i className="fa fa-sign-in"></i>
                    </span>
                    <span title="Começe seu login por aqui...">Entrar</span>
                </button>
            )
            
        }
    }

    render () {
        return (
            <section className="hero nav-hero is-medium is-bold">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="../">
                                    <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo" />
                                </a>
                                <span className="navbar-burger burger" data-target="navbarMenu">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenu" className="navbar-menu">
                                <div className="navbar-end">
                                    <div className="tabs is-right">
                                        <ul>                                            
                                            <li><button className="button is-text">Me ajude</button></li>                                            
                                        </ul>
                                        <span className="navbar-item">
                                            {this.RenderLoginLogout()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        )        
    }    
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default withRouter(connect(mapStateToProps)(Nav))

