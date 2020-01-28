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
        <div className="box">
          <figure className="avatar">
            <img src="https://cdn.icon-icons.com/icons2/1146/PNG/128/1486485581-account-audience-person-customer-profile-user_81164.png"
             alt="avatar"/>
          </figure>
          
            <div className="field">
              <div className="control">
                <input type="email" className="input is-medium" name="email" value={this.state.input_data.email}
                 onChange={e => this.inputDataValue(e)}
                 placeholder="Seu email" autoFocus="" required/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input type="password" className="input is-medium" name="password" value={this.state.input_data.password}
                 onChange={e => this.inputDataValue(e)}
                 placeholder="Sua senha" required/>
              </div>
            </div>            
            <button className="button is-block is-info is-large is-fullwidth"
             onClick={e => this.login(e)}>Login 
              <i className="fa fa-sign-in" aria-hidden="true"></i></button>
          
        </div>
      )
  }

  render() {
      return (
          <Main>
              <section className="hero is-success is-fullheight">
                <div className="">
                  <div className="container has-text-centered">
                    <div className="column is-6 is-offset-3">                      
                      <p className="subtitle has-text-black">Acesso ao seu login.</p>
                      {this.renderFormLogin()}
                    </div>
                  </div>
                </div>
              </section>
          </Main>
          
      )
  }
}

const mapStateToProps = store => ({  
  loggedUser: store.authLogin.response
})

export default connect(mapStateToProps)(LoginUser)
