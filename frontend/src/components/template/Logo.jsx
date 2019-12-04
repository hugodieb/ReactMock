import './Logo.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="logo is-primary">
        <Link to="/" className="logo">
            <img src="https://bulma.io/images/bulma-logo.png" alt=""/>
        </Link>
    </aside>
