import './Header.css'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { loginButton } from '../../actions/auth'
// import Avatar from '@components/login/avatar'

class Header extends Component {    
    state = {
        userLogged: false,
        user: {
            name: 'Hugo Dieb',
            age: 46
        }
    }
    

    render() {
        // const { authenticated, loginButton } = this.props               
        return (
            <header className="header d-none d-sm-flex flex-column">
                <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight header">
                        
                    </div>
                    <div className="mt-3 bd-highlight">
                        <Link to="/entrar" className="btn btn-primary">Entrar</Link>                  
                    </div>                
                </div>           
            </header>  
        )        
    }
}

//const mapStateToProps = store => ({
//   authenticated: store.authLogin.authenticated
//  })
//  const mapDispatchToProps = dispatch => 
//    bindActionCreators({ loginButton }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header