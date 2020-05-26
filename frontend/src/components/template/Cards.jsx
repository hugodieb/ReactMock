import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {    
    const { template } = props   
    return (        
        <div className="column is-one-third">
            <div className="card">
                <div className="card-image ">
                    <figure className="image is-4by3">
                        <Link to={{pathname: `template/${template.name}`, query: { id: template.id }}}>
                            <img src={template.image} alt="" />
                        </Link>                                       
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">                                    
                        <div className="media-content">
                            <p className="title is-4 no-padding">{template.title}</p>                                        
                        </div>
                    </div>
                    <div className="content">
                        {template.description}                                               
                    </div>                    
                    <div className="columns">
                        <div className="column">                            
                            <a href={template.demo} className="button is-outlined is-orange"><span> Demo</span></a>
                        </div>                        
                    </div>                                  
                </div>
            </div>
        </div>            
    )    
}

export default Card