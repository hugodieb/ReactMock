import './nav-mobile'
import indow from '../../assets/imgs/SVG/indow.svg'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AppApi from '~apijs'
import { removeCurrentUserAction } from '../../actions/auth'
import Auth from '../../services/auth'

class Nav extends Component {
    state = {
        user: {}
    }

    componentDidMount() {               
        this.setState({user: this.props.currentUser})
    }

    componentDidUpdate(prevProps, prevState) {                    
        if(this.props.currentUser !== prevProps.currentUser) {
            this.setState({user: this.props.currentUser})
        }       
    }

    renderLogin() {
        this.props.history.push({pathname: '/perfil/entrar', state: {from: this.props.location}})
    }

    renderProfile() {
        this.props.history.push('/perfil')
    }

    renderLogout() {                
        AppApi.logout().then(user => {                  
            this.props.dispatch(removeCurrentUserAction())
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
        if(this.state.user != null) {
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
                                    <span>{this.state.user.fullname}</span><br/>
                                    <span>{this.state.user.email}</span>
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
                        <Link className="navbar-item" to={{pathname: `/carrinho`}}>
                            Carrinho
                        </Link>                                  
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
                            <img src={indow} alt="Logo" />
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
    currentUser: store.currentUser.response
  })

export default withRouter(connect(mapStateToProps)(Nav))