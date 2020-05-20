import './ItemCartPay.css'
import React, { Component } from 'react'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import paypalImage from '../../assets/imgs/paypal.png'
import payment from '../../services/paypal'
import AppApi from '~apijs'


class ItemCartPay extends Component {   
    
    state = {
        error: '',
        display: false,
        template: {}
    }
  
    componentWillMount() {             
        payment.init(window.document)
        const { templateDetail } = this.props
        this.setState({template : templateDetail})                
    }
    
    componentDidMount() {
        payment.generatedToken().then(resp => {            
            this.setState({error: resp})
            if(this.state.error) {
                this.setState({display: true})
            }            
        })
    }
    componentWillUnmount() {        
        localStorage.removeItem(process.env.REACT_APP_KEY_NAME)
    }
    
    paymentService () {
        const params = {
            'id': this.state.template,
            'payment_method': 'paypal'
        }        
               
        AppApi.sale(params).then(invoice => {
            payment.paymentTransaction(invoice).then(resp => {
                this.setState({error: resp})
                if(this.state.error) {
                    this.setState({display: true})
                }
            })
        })             
    }   

    render() {
        const { error, display } = this.state        
        return (
            <div className="item-cart-parent-checkout">
                <div className="item-cart-child checkout">
                    <div className="columns">
                        <div className="column">
                            <h3>Resumo do pedido</h3>                       
                        </div>                    
                    </div>
                    <div className="columns">
                        <div className="column">
                            <p>{this.state.template.title}</p>                      
                        </div>
                        <div className="column">
                            <p>
                                R$ {this.state.template.pricePay}
                            </p>                      
                        </div>                    
                    </div>
                    <hr/>
                    <div className="columns">
                        <div className="column">
                            <h3>Total</h3>                        
                        </div>
                        <div className="column">
                            <p>
                                R$ {this.state.template.pricePay}                                   
                            </p>                        
                        </div>                                        
                    </div>
                    <div className="columns">
                        <div className="column is-half">
                            <div className="item-imagem">                    
                                <img className="item-img"
                                src={paypalImage} />
                            </div>
                        </div>
                        <div className="column is-8">
                            <div className="pay">
                                <a className="button is-medium" onClick={() => {this.paymentService()}}>
                                    PAGAMENTO
                                </a>
                            </div>                            
                        </div>                                               
                    </div>
                    <div className={`notification ${display ? "" : "hidden"}`}>
                        <div className="column">
                            <div className={`notification is-pay ${display ? "" : "hidden"}`}>
                                {error}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <p>*Após clicar no botão acima,
                        você será direcionado ao PayPal
                        para realizar login e depois o pagamento.*
                    </p>
                </div>                
            </div>
        )
    }    
}

const mapStateToProps = store => ({  
    templateDetail: store.templateDetail.response
})

export default withRouter( connect(mapStateToProps)(ItemCartPay))