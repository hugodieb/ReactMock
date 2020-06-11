import React, {Component} from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
import Gallery from '@components/ImageGallery'
import Loading from '@components/loading'
import { templateDetailAction } from '../../actions/templateDetail'
import { UpperCase } from '@filter'
import AppApi from '~apijs'

class Detail extends Component {

    state = {
        template: {},
        termineted: false
    }
    
    componentWillMount() {
        const id = !this.props.location.query || undefined ? null : this.props.location.query.id
        const name = id ? null : this.props.match.params.name     
        AppApi.getTemplateDetail(id, name).then(response => {                                         
            this.setState({template: response, termineted: true})
        })
    }

    checkout() {       
        this.props.dispatch(templateDetailAction(this.state.template))
        this.props.history.push('/carrinho')       
    }

    renderDetail(template) {
        return (
            <div className="detail tile is-ancestor">                
                <div className="tile is-parent is-7">
                    <article className="tile">                   
                        <div className="content">
                            <Gallery images={template.gallery}/>
                        </div>
                    </article>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">{UpperCase(template.title)}</p>
                        <p className="subtitle">{template.sku}</p>
                        <div className="content">
                            <h4>De: <span>R$ {template.price}</span></h4>
                            <h5><span>{template.discount}</span> % de desconto \o/</h5>
                            <div className="price">
                                <h1>Por: R$ {template.price_pay}</h1>
                            </div>                                
                            <hr/>
                            <div className="pay">
                                <button className="button is-large" onClick={e => this.checkout()}>Comprar</button>
                                <span><i className="fa fa-lock fa-2x" aria-hidden="true"></i></span>
                                <span>Compra Segura Paypal</span>
                            </div>
                            <hr/>
                            <div className="send-method">
                                <p>
                                    *Após finalizar a compra, será disponibilizado um botão <br/>
                                        para download do arquivo e também automaticamente, <br/>
                                            enviaremos o código para sua caixa de email cadastado.* 
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </p>
                            </div>
                            <hr/>
                            <div className="description">
                                <h2>Descrição</h2>
                                <p>
                                    {template.description}                                     
                                </p>                                    
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        )      
    }

    render() {        
        const {template, termineted} = this.state

        return (
            <Main>
                {termineted
                    ? this.renderDetail(template)
                    : <Loading />
                }              
            </Main>           
        )
    }
}

const mapStateToProps = store => ({    
    currentUser: store.currentUser.response
})

export default connect(mapStateToProps)(Detail)