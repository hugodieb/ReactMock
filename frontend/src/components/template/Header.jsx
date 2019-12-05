import './Header.css'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {user: null }       
    }
    
    componentDidMount() {
        this.setState({user: this.props.loggedUser})
    }

    componentDidUpdate(prevProps, prevState) { 
                
        if(this.props.loggedUser !== prevProps.loggedUser) {
            this.setState({user: this.props.loggedUser})
        }       
    }

    loginButton() {       
        
        if(!this.state.user) {
            return (
                <div className="buttons">                   
                    <Link to="/entrar" className="button is-primary is-rounded">
                        <span className="icon">
                            <i className="fa fa-sign-in"></i>
                        </span>
                        <span>Entrar</span>
                    </Link>
                </div>
            )
        } else {
            return (                
                <img className="user-avatar" src={this.state.user.photo_url} alt="" />                
            )
        }
    }

    render() {                    
        return (
            <nav className="navbar is-bold" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    
                    <Link to="" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>                            
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                   <div className="navbar-end">                        
                        <div className="navbar-item">
                            {this.loginButton()}
                        </div>
                    </div> 
                </div>                
            </nav>             
        )        
    }
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default connect(mapStateToProps)(Header)