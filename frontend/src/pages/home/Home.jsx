import './Home.css'
import React, {Component} from 'react'
import Main from '@components/template/Main'
import Cards from '@components/template/Cards'
import Hero from '@components/hero-body/Hero-body'
import Footer from '@components/footer/Footer'

import shift1 from '@imgs/shift/shift1.svg'
import shift2 from '@imgs/shift/shift2.svg'
import shift3 from '@imgs/shift/shift3.svg'

import AppApi from '~apijs'

const initialState = {
    listCards: [],
    articles: [
        {   
            "title": "Modernidade",
            "subtitle": "Código em html, css, javascript moderno onde qualquer \
            desenvolvedor lê o código e já sai codificando conforme a necessidade do seu cliente.",
            "img": shift1
        },
        {
            "title": "Responsividade",
            "subtitle": "Os templates já são desenvolvidos para se adequar aos atuais aparelhos \
            do mercado como desktop, mobiles e tablets.",
            "img": shift2
        },
        {
            "title": "Economia",
            "subtitle": "Tempo é dinheiro e com os templates prontos voçê economiza em horas de \
            desenvolvimento e já viabilizando colocar seu site no ar mais cedo.",
            "img": shift3
        }
    ]
}

class Home extends Component {
    
    state = {...initialState}

    componentWillMount() {
        AppApi.getTemplates().then(response => {
            this.setState({listCards: response.data})
            console.log("meu .env", process.env.REACT_APP_DIEB);            
        })
    }

    renderCard() {
        return this.state.listCards.map(template => {            
            return (
                <Cards key={template.id} id={template.id} title={template.title}
                 description={template.description} image={template.image}
                 demo={template.demo} name={template.name}
                 />
            )
        })
    }

    renderArticle() {
        return this.state.articles.map( article => {
            return (
                <div className="tile is-parent" key={article.title}>
                    <article className="tile is-child box">
                        <figure className="image">
                            <img src={article.img}/>
                        </figure>
                        <p className="title">{article.title}</p>
                        <p className="subtitle">{article.subtitle}
                        </p>                                      
                    </article>
                </div>
            )
        } )
    }

    render() {        
        
        return (
            <Main>
                <Hero />
                <section className="container ">                
                    <h4 className="title is-4 ">Escolha o modelo da sua loja \o/</h4>
                    <div className="columns is-multiline features">                        
                        {this.renderCard()}
                    </div>                  
                </section>
                <section className="hero">
                    <div className="hero-body">                   
                        <div className="container shift has-text-centered">
                            <h2>Facilitando o seu tempo</h2>
                            <div className="tile is-ancestor">
                                {this.renderArticle()}                                               
                            </div>          
                        </div>
                    </div>
                </section>
                <Footer />                
            </Main>
        )
    }
}
  export default Home
