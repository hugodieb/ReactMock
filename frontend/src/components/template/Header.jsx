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
                <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight header">

                    </div>
                    <div className="mt-3 bd-highlight">
                        <Link to="/entrar" className="btn btn-primary">Entra</Link>                  
                    </div>                
                </div>
            )
        } else {
            return (
                <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight header">
                        
                    </div>
                    <div className="mt-1 bd-highlight">
                    <img className="img-thumbnail user" src={this.state.user.photo_url} alt=""/>           
                    </div>                
                </div>
            )
        }
    }

    render() {                    
        return (
            <header className="header d-none d-sm-flex flex-column">
                {this.loginButton()}       
            </header>  
        )        
    }
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default connect(mapStateToProps)(Header)