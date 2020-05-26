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
            <h1>navbar</h1>           
        )        
    }
}

const mapStateToProps = store => ({  
    loggedUser: store.authLogin.response
  })

export default connect(mapStateToProps)(Header)