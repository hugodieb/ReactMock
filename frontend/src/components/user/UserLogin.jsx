import './UserLogin.css'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import Main from '@components/template/Main'
import { loginUserAction } from '../../actions/auth'
import AppApi from '~apijs'
import Auth from '../../services/auth'

const initialState = {
  input_data: {email: '', password: ''},
  user: {}
}

class LoginUser extends Component {
  constructor(props) {
    super(props)
    this.state = {...initialState}
  }  
    
  inputDataValue(event) {
    let input_data = this.state.input_data
    input_data[event.target.name] = event.target.value
    this.setState({input_data})
  }

  componentDidMount() {                  
    const { loggedUser } = this.props 
    this.setState({input_data: {email: "", password: ""}, user: {}})   
    if(loggedUser) {           
      this.props.history.push('/')
    }
  }

  login() {
    debugger    
    let email = this.state.input_data.email
    let password = this.state.input_data.password      
    AppApi.login(email, password).then(userCurrent => {                        
      this.props.dispatch(loginUserAction(userCurrent))
      const { loggedUser } = this.props
      if(loggedUser) {
        Auth.authentication()
        this.props.history.push('/')  
      }
    })             
  } 

  renderFormLogin() {
      return (               
        <h1>login</h1>
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
