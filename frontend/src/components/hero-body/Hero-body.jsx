import './hero-body.css'
import React, { Component } from 'react'
import baner from '../../assets/imgs/baner-hero.png'
//import mobile from '../../assets/imgs/baner-hero-mobile.png'

class Hero extends Component {
    render () {
        return (
            //<div className="hero hero-body is-bold">
            //    <div className="hero-body">
            //        <div className="container has-text-centered">
            //            <h1 className="title">
            //                Front-end Bulma
            //            </h1>
            //            <h2 className="subtitle">
            //                Aplicação com React-app
            //            </h2>
            //        </div>
            //    </div>
            //</div>
            <div className="hero-baner">
                <img className="hero-img" src={baner} alt="baner"/>               
            </div>            
        )        
    }
}

export default Hero
