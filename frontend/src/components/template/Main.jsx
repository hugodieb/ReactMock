import './Main.css'
import React from 'react'
import Header from '@components/template/Header'

export default props =>
    <React.Fragment>
        <Header />        
        <section className="hero is-bold">
            <div className="hero-body">
                
                    {props.children}                        
                
            </div>            
        </section>        
    </React.Fragment>