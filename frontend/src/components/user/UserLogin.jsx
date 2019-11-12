import './UserLogin.css'
import React, { Component } from 'react'
//import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
import { loginUserAction } from '../../actions/auth'
import AppApi from '~apijs'

const initialState = {
  input_data: {email: '', password: ''},
  user: {}
}

class LoginUser extends Component {

  state = {...initialState}
  
  inputDataValue(event) {
    let input_data = this.state.input_data
    input_data[event.target.name] = event.target.value
    this.setState({input_data})
  }

  componentDidMount() {       
    const { loggedUser } = this.props   
    if(loggedUser) {      
      this.props.history.push('/')
    }
  }

  login() {    
    let email = this.state.input_data.email
    let password = this.state.input_data.password      
    AppApi.login(email, password).then(user => {           
        this.props.dispatch(loginUserAction(user))
        const { loggedUser } = this.props
        if(loggedUser) {
          this.props.history.push('/')
        }
    })             
  }
  
  who() {  
    AppApi.whomi().then(resp => {
      console.log(resp.data)
    })       
  }
  
  logout() {  
    AppApi.logout().then(resp => {
      console.log(resp.data)
    })       
  }

  renderFormLogin() {
      return (
        
        <div className="card card-login">
          <div className="card-body">
            <div className="row justify-content-center">
            <div className="col-8 ">                          
              <div className="row align-items-center mt-4">
                <div className="col-12">                  
                  <h1 className="mb-4">Vamos logar meu caro...!</h1>                
                  <input type="email" name="email" value={this.state.input_data.email}
                   onChange={e => this.inputDataValue(e)}
                   className="form-control" placeholder="Email" />
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col">
                  <input type="password" name="password" value={this.state.input_data.password}
                  onChange={e => this.inputDataValue(e)}
                   className="form-control" placeholder="Password" />
                </div>            
              </div>
              <div className="row justify-content-start mt-4">
                <div className="col">
                    <button className="btn btn-login btn-lg btn-block"
                    onClick={e => this.login(e)}>Entrar</button>
                    <button className="btn btn-login btn-lg btn-block"
                    onClick={e => this.who(e)}>who</button>
                    <button className="btn btn-login btn-lg btn-block"
                    onClick={e => this.logout(e)}>logout</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>         
      )
  }

  render() {
      return (
          <Main>
              {this.renderFormLogin()}
          </Main>
          
      )
  }
}

const mapStateToProps = store => ({  
  loggedUser: store.authLogin.response
})


export default connect(mapStateToProps)(LoginUser)
