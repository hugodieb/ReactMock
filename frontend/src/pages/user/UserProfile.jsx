import './UserProfile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
import { snackbarOpen } from '../../actions/snackbar'
import InputField from '@components/InputMask'
import { fullname, email }  from '../../helpers/rules'
import AppApi from '~apijs'

class UserProfile extends Component {  
  
  state = {
    user: {}
  }

  componentWillMount() {
    const { loggedUser } = this.props
    this.setState({user : loggedUser})    
  } 

  updateField = (event, value) => {
    const user  = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({user})    
  }

  saveProfile = e => {
    e.preventDefault()    
    const user = {...this.state.user}
    AppApi.saveProfile(user).then(response => {      
      const resp = response.data
      this.props.dispatch(snackbarOpen({message: "Perfil atualizado com sucesso!", color: "success"}))
    })              
  }
  render() {
    
      return (
        <Main>               
            <section className="container">              
                <div className="profile">
                  <h1 className="title is-white">Editar perfil</h1>                 
                  <form onSubmit={this.saveProfile}>
                    <label className="label">Nome Completo</label>
                    <p className="control">
                      <input name="name" className="input" type="text" onInput={e => fullname(e)}
                       value={this.state.user.name} onChange={e => this.updateField(e)} required />
                    </p>
                    <label className="label">Cpf</label>
                    <p className="control">
                      <InputField className="input"  name="cpf"
                        value={this.state.user.cpf} onChange={this.updateField} mask="cpf"/>
                    </p>
                    <label className="label">Email</label>
                    <p className="control">
                      <input name="email" className="input" type="text" onInput={e =>  email(e)}
                       value={this.state.user.email} onChange={e => this.updateField(e)} required />
                    </p>                 
                    <label className="label">Celular</label>
                    <p className="control">
                      <InputField className="input"  name="cellphone"
                        value={this.state.user.cellphone} onChange={this.updateField} mask="phone"/>
                    </p>
                    <br/>
                    <br/>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link"
                         onClick={() => this.props.history.push("home")}>Cancelar
                        </button>
                      </div>
                      <div className="control">
                        <button className="button is-link"
                          type="submit"
                        >Salvar Alterações</button>
                      </div>
                    </div>                   
                  </form>                                  
                </div>                        
            </section>
        </Main>          
      )
  }
}

const mapStateToProps = store => ({  
  loggedUser: store.authLogin.response
})

export default connect(mapStateToProps)(UserProfile)
