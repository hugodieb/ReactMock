import './hero-body.css'
import React, { Component } from 'react'
import baner from '../../assets/imgs/baner-hero.png'
//import mobile from '../../assets/imgs/baner-hero-mobile.png'

class Hero extends Component {
    render () {
        return (            
            <div className="hero-baner">
                <img className="hero-img" src={baner} alt="baner"/>               
            </div>            
        )        
    }
}

export default Hero
