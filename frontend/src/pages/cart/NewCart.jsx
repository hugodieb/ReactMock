import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Main from '@components/template/Main'
import ItemCart from '@components/cart/ItemCart'
import ItemCartPay from '@components/cart/ItemCartPay'
import { templateDetailAction } from '../../actions/templateDetail'
import Loading from '@components/loading'
import AppApi from '~apijs'

class Checkout extends Component {
    state = {
        template: {
            id: ''
        },
        termineted: false
    }

    componentWillMount() {         
        const { templateDetail, currentUser, temp } = this.props
        console.log(temp)
        if(templateDetail) {
            this.setState({template: templateDetail,
                 termineted: true, user: currentUser})
        }else {                       
            AppApi.getItemCart(currentUser).then(response => {                    
                this.props.dispatch(templateDetailAction(response))                
                this.setState({template: response, termineted: true})            
            })
        }       
    }   

    renderNotification() {           
        if(this.state.template.id) {
            return (
                <div className="notice has-text-centered">                       
                    <span>
                        <i className="fa fa-trophy" aria-hidden="true"></i>
                        <span className="desktop">
                            Parabenś! Voçê está quase lá!
                            <span>
                                Prossiga para o pagamento!! *Após pagamento, disponibilizamos o download* 
                            </span>                        
                        </span>                                            
                    </span>                
                </div>
            ) 
        }        
    }

    renderCartItems() {                
        if(!this.state.template.id){
            return (
                <div className="empty-cart">
                    <div className="has-text-centered">
                        <span>
                            <i className="fa fa-shopping-cart fa-3x" aria-hidden="true"></i>
                        </span>
                        <h2 className="subtitle">
                            Seu carrinho está vazio
                        </h2>
                        <h3 className="subtitle">Adicione um template clicando no botão comprar.</h3>
                        <Link className="button is-focused" to="/">
                            Voltar para a página inicial
                        </Link>
                    </div>
                    <hr/>
                </div>
            )
        } else {
            return (
                <div className="tile is-ancestor">                
                    <div className="tile is-parent item">
                        <article className="tile is-child box">                            
                            <div className="content">
                                <ItemCart />                                                                
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent checkout">
                        <article className="newcart tile is-child box checkout">
                            <div className="content">
                                <ItemCartPay />                                         
                            </div>
                        </article>
                    </div>
                </div>
            )  
        }        
    }

    render() {
        const { termineted } = this.state        
        return(            
            <Main>
                <div className="container newcart">
                    {this.renderNotification()}
                    {termineted ? 
                        this.renderCartItems() :
                        < Loading />
                    }                   
                </div>
            </Main>
        )
    }
}

const mapStateToProps = store => ({  
    templateDetail: store.templateDetail.template,
    currentUser: store.currentUser.response,
    temp: store.templateDetail
})

export default connect(mapStateToProps)(Checkout)