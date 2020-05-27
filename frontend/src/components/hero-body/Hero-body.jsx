import React, { Component } from 'react'
import baner from '../../assets/imgs/udraw.png'
//import mobile from '../../assets/imgs/baner-hero-mobile.png'

class Hero extends Component {
    render () {
        return (                           
            <div className="hero-baner">                
                <img className="hero-img" src={baner} alt="baner"/>
                <h1 className="title is-1">Templates para todos.</h1><br/>
                <h4 className="title is-4">A sua página web com o conteúdo que todos querem ver.</h4>                            
            </div>                       
        )        
    }
}

export default Hero
