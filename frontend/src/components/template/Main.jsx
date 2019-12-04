import './Main.css'
import React from 'react'
import Header from '@components/template/Header'

export default props =>
    <React.Fragment>
        <Header />        
        <section className="hero is-primary is-bold">
            <div className="hero-body">
                <div className="container">
                    {props.children}                        
                </div>
            </div>            
        </section>        
    </React.Fragment>