import './Detail.css'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Main from '@components/template/Main'
import MyGallery from '@components/ImageGallery'
import { templateDetailAction } from '../../actions/templateDetail'
import { snackbarOpen } from '../../actions/snackbar'
import AppApi from '~apijs'

class Detail extends Component {

    state = {
        template: {}
    }
    
    componentWillMount() {                               
       const id = !this.props.location.query || undefined ? null : this.props.location.query.id
       const name = id ? null : this.props.match.params.name       
       if(id) {
           AppApi.getTemplateDetail(id).then(resp => {               
               this.setState({template: resp})
           })
        } else {
            AppApi.filterTemplate(name).then(resp => {                
                this.setState({template: resp})
            })
        }
    }

    checkout() {      
        //const { currentUser } = this.props        
        this.props.dispatch(templateDetailAction(this.state.template))
        this.props.history.push('/checkout')       
    }

    render() {
        const {template} = this.state

        return (
            <Main>
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
                            <p className="title">{template.title}</p>
                            <p className="subtitle">{template.sku}</p>
                            <div className="content">
                                <h4>De: <span>R$ {template.price}</span></h4>
                                <h5><span>{template.discount}</span> de desconto \o/</h5>
                                <div className="por-price">
                                    <h1>Por: R$ {template.pricePay}</h1>
                                </div>
                                <div className="discount">
                                    <h3>{template.installments}x <span>sem juros</span> de R$ {template.pricePortions}</h3>
                                </div>
                                <hr/>
                                <div className="pay">
                                    <a className="button is-large" onClick={e => this.checkout()}>Comprar</a>
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
                                    <p>
                                        {template.descrption}                                     
                                    </p>                                    
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </Main>           
        )
    }
}

const mapStateToProps = store => ({    
    currentUser: store.currentUser.response
})

export default connect(mapStateToProps)(Detail)