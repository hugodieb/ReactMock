import './Home.css'
import React, {Component} from 'react'
import Main from '@components/template/Main'
import Cards from '@components/template/Cards'
import Hero from '@components/hero-body/Hero-body'
import Footer from '@components/footer/Footer'
import AppApi from '~apijs'

const initialState = {
    listCards: []
}

class Home extends Component {
    
    state = {...initialState}

    componentWillMount() {
        AppApi.getCards().then(response => {
            this.setState({listCards: response.data})            
        })
    }

    renderCard() {
        return this.state.listCards.map(card => {            
            return (
                <Cards key={card.id} title={card.title} description={card.description} image={card.image}/>
            )
        })
    }

    render() {        
        
        return (
            <Main>
                <Hero />
                <section className="container ">                
                    <h4 className="title is-4 ">Escolha o modelo da sua loja \o/</h4>
                    <div className="row columns is-multiline features">                        
                        {this.renderCard()}
                    </div>                  
                </section>
                <Footer />                
            </Main>
        )
    }
}
  export default Home
