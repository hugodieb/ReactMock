import './Cards.css'
import React from 'react'

const Card = (props) => {    
    return (        
        <div className="column is-one-third">
            <div className="card large round">
                <div className="card-image ">
                    <figure className="image">
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
                </div>
            </div>
        </div>            
    )    
}

export default Card