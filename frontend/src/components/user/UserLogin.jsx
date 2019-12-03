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
        
        //<div className="card card-login">
        //  <div className="card-body">
        //    <div className="row justify-content-center">
        //    <div className="col-8 ">                          
        //      <div className="row align-items-center mt-4">
        //        <div className="col-12">                  
        //          <h1 className="mb-4">Vamos logar meu caro...!</h1>                
        //          <input id="mainInput" type="email" name="email" value={this.state.input_data.email}
        //           onChange={e => this.inputDataValue(e)}
        //           className="form-control" placeholder="Email" />
        //        </div>
        //      </div>
        //      <div className="row align-items-center mt-4">
        //        <div className="col">
        //          <input type="password" name="password" value={this.state.input_data.password}
        //          onChange={e => this.inputDataValue(e)}
        //           className="form-control" placeholder="Password" />
        //        </div>            
        //      </div>
        //      <div className="row justify-content-start mt-4">
        //        <div className="col">
        //            <button className="btn btn-login btn-lg btn-block"
        //            onClick={e => this.login(e)}>Entrar</button>                   
        //        </div>
        //      </div>
        //    </div>
        //  </div>
        //  </div>
        //</div>        
        <section className="hero is-success is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                  <form action="" className="box">
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left">
                        <input type="email" name="email" placeholder="bobsmith@gmail.com"
                         value={this.state.input_data.email}
                         onChange={e => this.inputDataValue(e)} 
                         className="input" required                           
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left">
                        <input type="password" placeholder="*******" name="password"
                         value={this.state.input_data.password}
                         onChange={e => this.inputDataValue(e)}
                         className="input" required                           
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
                  </form>
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
