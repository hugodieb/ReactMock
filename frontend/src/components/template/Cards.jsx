import './Cards.css'
import React from 'react'

const Card = (props) => {    
    return (        
        <div className="column is-one-third">
            <div className="card">
                <div className="card-image ">
                    <figure className="image is-4by3">
                        <img src={props.image} alt="" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">                                    
                        <div className="media-content">
                            <p className="title is-4 no-padding">{props.title}</p>                                        
                        </div>
                    </div>
                    <div className="content">
                        {props.description}                                               
                    </div>                    
                    <div className="columns is-vcentered">
                        <div className="column">
                            <a className="button is-outlined is-cart"><span><i className="fa fa-shopping-cart" aria-hidden="true"></i></span></a>
                        </div>
                        <div className="column is-4">
                            <a href={props.url} className="button is-outlined is-orange"><span> Demo</span></a>                           
                        </div>
                    </div>                                  
                </div>
            </div>
        </div>            
    )    
}

export default Card