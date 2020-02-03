import './UserProfile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'

class UserProfile extends Component { 

  render() {
      return (
        <Main>
            <section className="hero is-success is-fullheight">
              <div className="">
                <div className="container has-text-centered">
                  <div className="column is-6 is-offset-3">                      
                    <h2>Profile</h2>
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

export default connect(mapStateToProps)(UserProfile)
