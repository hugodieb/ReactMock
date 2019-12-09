import './Main.css'
import React from 'react'

export default props =>
    <React.Fragment>
        <section className="container">
            <div className="columns features">
                <div className="column is-4">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <i className="fa fa-paw"></i>
                        </div>                    
                        <div className="card-content">
                            <div className="content">
                                <h4>blalalalal</h4>
                                <p>vlvlvlvlvl voldofwefbwe weifbqobfq fbweweu wefbwef</p>
                                <p><a href="/">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <i className="fa fa-empire"></i>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Tempor orci dapibus ultrices in.</h4>
                                <p className="">Ut venenatis tellus in metus vulputate.
                                sed risus.nunwenfw unfweunfwenfwef</p>
                                <p><a href="/">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shady">
                        <div className="card-image has-text-centered">
                            <i className="fa fa-apple"></i>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Tempor orci dapibus ultrices in.</h4>
                                <p className="">Ut venenatis tellus in metus vulputate.
                                sed risus.nunwenfw unfweunfwenfwef</p>
                                <p><a href="/">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>                      
        {props.children}           
    </React.Fragment>