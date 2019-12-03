import React, {Component} from 'react'
import Main from '@components/template/Main'

class Home extends Component {    

    render() {        
        
        return (
            <Main icon="home" title="Início"
                subtitle="Seu projeto React com uso de dados mock"
            >
                <section className="hero is-medium is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Primary bold title
                            </h1>
                            <h2 className="subtitle">
                                Primary bold subtitle
                            </h2>                            
                        </div>
                    </div>
                </section>                  
            </Main>
        )
    }
}
  export default Home
