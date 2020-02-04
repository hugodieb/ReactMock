import './UserProfile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'

class UserProfile extends Component {
  
  validPhone(event) {
    
  }

  saveProfile() {

  }

  render() {
      return (
        <Main>
            <section className="section">
              <div className="container">
                <div id="contact">
                  <h1 className="title">contact</h1>                 
                  <form id="contact-form" action="" method="POST">
                    <label className="label">Nome Completo</label>
                    <p className="control">
                      <input name="name" className="input" type="text" required />
                    </p>
                    <label className="label">Email</label>
                    <p className="control">
                      <input name="email" className="input" type="text" required />
                    </p>
                    <label className="label">Celular</label>
                    <p className="control">
                      <input name="name" className="input" type="text" required />
                    </p>
                    <br/>
                    <br/>                    
                    <p className="control">
                      <input className="button is-disabled is-primary" type="submit" value="Salvar alterações" />
                    </p>
                  </form>                
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

export default connect(mapStateToProps)(UserProfile)
