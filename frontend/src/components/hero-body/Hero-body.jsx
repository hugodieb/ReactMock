import './hero-body.css'
import React, { Component } from 'react'

class Hero extends Component {
    render () {
        return (
            <div className="hero hero-body is-bold">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Front-end Bulma
                        </h1>
                        <h2 className="subtitle">
                            Aplicação com React-app
                        </h2>
                    </div>
                </div>
            </div>            
        )        
    }
}

export default Hero
