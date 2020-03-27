import './Checkout.css'
import React, {Component} from 'react'
import Main from '@components/template/Main'
import MyGallery from '@components/ImageGallery'
import AppApi from '~apijs'

class Detail extends Component {

    state = {
        template: {}
    }

    componentWillMount() {                        
       const id = !this.props.location.query || undefined ? null : this.props.location.query.id
       const name = id ? null : this.props.match.params.name
        
       if(id) {
           AppApi.getTemplate(id).then(resp => {
               this.setState({template: resp.data})
           })
        } else {
            AppApi.filterTemplate(name).then(resp => {                
                this.setState({template: resp.data[0]})
            })
        }
    }

    render() {        
        const {template} = this.state

        return (
            <div className="tile is-ancestor">                
                <div className="tile is-parent is-7">
                    <article className="tile">                   
                    <div className="content">
                        <MyGallery />
                    </div>
                    </article>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">Nome do meu Template</p>
                        <p className="subtitle">BRWDMC8</p>
                        <div className="content">
                            <h4>De: <span>R$ 120,00</span></h4>
                            <h5><span>30%</span> de desconto \o/</h5>
                            <div className="por-price">
                                <h1>Por: R$ 89,99</h1>
                            </div>
                            <div className="discount">
                                <h3>3x <span>sem juros</span> de R$ 29,99</h3>
                            </div>
                            <hr/>
                            <div className="pay">
                                <a className="button is-large">Comprar</a>
                                <span><i className="fa fa-lock fa-2x" aria-hidden="true"></i></span>
                                <span>Compra Segura</span>
                            </div>
                            <hr/>
                            <div className="send-method">
                                <p>
                                    **Todo o código do Template da sua loja será enviado
                                     pelo email cadastrado em até 24 horas. 
                                     <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
                                </p>
                            </div>
                            <hr/>
                            <div className="description">
                                <h2>Descrição</h2>
                                <p>Loja ecommerce com código  
                                    <strong> HTML, CSS e JAVASCRIPT</strong> prontinhos
                                    para voçê iniciar sua loja.
                                    Seu cliente vai navegar no seu site de forma intuitiva e 
                                    ágil.
                                    Pagina de apresentação da sua loja(Home), página de
                                    detalhe do produto, adicionar ao carrinho, checkout e
                                    finalização do processo de compra.                                     
                                </p>
                                <p>
                                    Cao precise de auxilio, teremos muita satisfação em ajudar, 
                                    inclusive temos nossos desenvolvedores que poderam orientá-lo
                                    com algumas dúvidas e se ainda voçê não tenha um desenvolvedor, 
                                    podemos lhe oferecer também este serviço.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>            
        )
    }}

export default Detail