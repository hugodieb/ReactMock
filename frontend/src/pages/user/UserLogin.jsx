import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
import { snackbarOpen } from '../../actions/snackbar'
import { setCurrentUserAction } from '../../actions/auth'
import AppApi from '~apijs'
import { authentication, isAuthenticated } from '../../services/auth'

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
    const { currentUser } = this.props 
    this.setState({input_data: {email: "", password: ""}, user: {}})   
    if(currentUser) {           
      this.props.history.push('/')
    }
  }

  login() {        
    let email = this.state.input_data.email
    let password = this.state.input_data.password      
    AppApi.login(email, password).then(user => {                            
      if(user && user.id) {
        authentication().then(() => {                  
          if(isAuthenticated()){
            localStorage.setItem('user', JSON.stringify(user))            
            this.props.dispatch(setCurrentUserAction(user))            
            const location = this.props.location.state
            location ? this.props.history.push(location.from.pathname) : this.props.history.push('/')
          } else {
            this.props.history.push('/perfil/entrar')
          }
        })           
      } else {
        this.props.dispatch(snackbarOpen({message: "Senha ou email incorreto. Tente novamente!", color: "error"}))
      }
    }).catch(() => {
      this.props.dispatch(snackbarOpen({message: "Erro desconhecido, tente mais tarde!", color: "error"}))
    })             
  } 

  renderFormLogin() {
      return (               
        <div className="box" >
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
            <i className="fa fa-sign-in" aria-hidden="true"></i>
          </button>          
        </div>
      )
  }

  render() {
      return (
        <Main>
            <section className="login">
              <div className="login__hero">
                <div className="container has-text-centered">
                  <div className="column is-6 is-offset-3">                      
                    <p className="subtitle">Acesso ao seu login.</p>
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
  currentUser: store.currentUser.response
})

export default connect(mapStateToProps)(LoginUser)
