import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Main from '@components/template/Main'
import ItemCart from '@components/cart/ItemCart'
import ItemCartPay from '@components/cart/ItemCartPay'


class Checkout extends Component {

    state = {
        template: {}
    }

    componentDidMount() {             
        const { templateDetail } = this.props
        this.setState({template : templateDetail})
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
        return(            
            <Main>
                <div className="container newcart">
                    {this.renderNotification()}                  
                    {this.renderCartItems()}
                </div>
            </Main>
        )
    }
}

const mapStateToProps = store => ({  
    templateDetail: store.templateDetail.response
})

export default connect(mapStateToProps)(Checkout)