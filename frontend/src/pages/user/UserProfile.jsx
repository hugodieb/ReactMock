import './UserProfile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
//import formHelpers from '../../helpers/rules'
import InputField from '@components/InputMask'

class UserProfile extends Component {  
  
  state = {
    user: {
      
    }
  }

  componentWillMount() {    
    const {loggedUser} = this.props
    this.setState({user : loggedUser})
    console.log(this.state.user);
  }

  updateField = (event, value) => {
    debugger      
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({user})    
  }

  render() {
    
      return (
        <Main>               
            <section className="container">              
                <div className="profile">
                  <h1 className="title is-white">Meu perfil</h1>                 
                  <form>
                    <label className="label">Nome Completo</label>
                    <p className="control">
                      <input name="name" className="input" type="text"
                       value={this.state.user.name} onChange={e => this.updateField(e)} required />
                    </p>
                    <label className="label">Email</label>
                    <p className="control">
                      <input name="email" className="input" type="text"
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
                        <button className="button is-link">Cancelar</button>
                      </div>
                      <div className="control">
                        <button className="button is-link">Salvar Alterações</button>
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
