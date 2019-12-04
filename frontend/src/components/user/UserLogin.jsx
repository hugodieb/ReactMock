import './UserLogin.css'
import React, { Component } from 'react'
//import { Redirect} from 'react-router-dom'
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
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left">
                        <input type="email" className="input" name="email" placeholder="bobsmith@gmail.com"
                         value={this.state.input_data.email}
                         onChange={e => this.inputDataValue(e)} 
                         required                           
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left">
                        <input type="password" className="input" placeholder="*******" name="password"
                         value={this.state.input_data.password}
                         onChange={e => this.inputDataValue(e)}
                         required                           
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                    </div>                    
                    <div className="field">
                      <button className="button is-success" onClick={e => this.login(e)}>
                        Login
                      </button>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
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
