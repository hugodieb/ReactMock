import './Main.css'
import React from 'react'

export default props =>
    <React.Fragment>
        <div className="main">
            {window.scrollTo(0, 0)} 
            {props.children} 
        </div>
                             
    </React.Fragment>