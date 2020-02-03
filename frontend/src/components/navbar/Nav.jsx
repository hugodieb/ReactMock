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

    renderLogin() {
        this.props.history.push('/perfil/entrar')
    }

    renderProfile() {
        this.props.history.push('/perfil')
    }

    renderLogout() {        
        AppApi.logout().then(user => {
            this.props.dispatch(loginUserAction(user))
            Auth.authentication()
            this.props.history.push('/')
        })
    }

    ButtonsHelpNav() {
        if(this.state.user) {
            return (
                <span>
                   <a className="button is-text is-help">
                        Descontos
                    </a>
                    <a className="button is-text is-help">
                        Me ajude
                    </a>
                    <a className="button is-text is-help">
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                    </a>
                </span>                
            )
        } else {
            return (
                <a className="button is-text is-help">
                    Me ajude
                </a>
            )
        }
    }

    RenderLoginLogout() {        
        if(this.state.user) {
            return (                
                <div className="navbar-item has-dropdown is-hoverable">
                    <span className="navbar-item is-drop">
                        <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                    </span>
                    
                    <div className="navbar-dropdown is-right is-boxed">
                        <div className="navbar-item">
                            <div className="userprofile">
                                <div className="avatar">
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>                                
                                <div className="user">
                                    <span>Hugo Dieb</span><br/>
                                    <span>dieb@dieb.com</span>
                                </div>                              
                                                                                                                       
                            </div>                                                       
                        </div>
                        <hr className="dropdown-divider"></hr>                                
                        <a className="navbar-item" onClick={() => this.renderProfile()}>
                            Perfil
                        </a>
                        <a className="navbar-item" href="#">
                            Carrinho
                        </a>                                  
                        <a className="navbar-item is-active" onClick={() => this.renderLogout()}>
                            <span >Sair</span>
                        </a>
                    </div>                                    
                </div>                            
            )           
        } else {
            return (
                <a className="button is-text is-nav" onClick={() => this.renderLogin()}>
                    <span className="icon">
                        <i className="fa fa-sign-in"></i>
                    </span>
                    <span title="Começe seu login por aqui...">Entrar</span>
                </a>
            )            
        }
    }

    render () {
        return (
            <section className="hero nav-hero is-medium is-bold">                
                <nav className="navbar">                        
                    <div className="navbar-brand">
                        <a className="navbar-item" href="../">
                            <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo" />
                        </a>
                        <span className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarExampleTransparentExample" className="navbar-menu">
                        <div className="navbar-end">
                            <span className="navbar-item mb">
                                {this.ButtonsHelpNav()}                                                                                                
                            </span>                                                                          
                            <span className="navbar-item">
                                {this.RenderLoginLogout()}
                            </span>                                
                        </div>
                    </div>                        
                </nav>                
            </section>
        )        
    }    
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default withRouter(connect(mapStateToProps)(Nav))