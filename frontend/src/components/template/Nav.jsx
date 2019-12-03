import './Nav.css'
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

    logout() {        
        AppApi.logout().then(user => {
            this.props.dispatch(loginUserAction(user))
            Auth.authentication()
            this.props.history.push('/')
        })
    }

    btnLogout() {        
        if(this.state.user) {
            return (
                <div className="btn-out">
                    <button className="btn btn-link"
                        onClick={() => this.logout()}><i className="fa fa-sign-out"></i> Sair</button>
                </div>  
            )           
        }
    }

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
                    {this.btnLogout()}              
                </nav>
            </aside>
        )        
    }    
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default withRouter(connect(mapStateToProps)(Nav))

