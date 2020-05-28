import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {    
    const { template } = props   
    return (        
        <div className="column is-one-third">
            <div className="card">
                <div className="card__image ">
                    <figure className="image is-4by3">
                        <Link to={{pathname: `template/${template.name}`, query: { id: template.id }}}>
                            <img src={template.image} alt="" />
                        </Link>                                       
                    </figure>
                </div>
                <div className="card__content has-text-centered">
                    <div className="media">                                    
                        <div className="media-content">
                            <p className="title">{template.title}</p>                                        
                        </div>
                    </div>
                    <div className="content">
                        {template.description}                                               
                    </div>                    
                    <div className="columns">
                        <div className="column">                            
                            <a href={template.demo} className="button is-outlined"><span>Detalhes</span></a>
                        </div>
                        <div className="column">                            
                            <a href={template.demo} className="button"><span>Demonstração</span></a>
                        </div>                        
                    </div>                                  
                </div>
            </div>
        </div>            
    )    
}

export default Card