import './ItemCartPay.css'
import React, { Component } from 'react'
import { withRouter } from "react-router"
import paypalImage from '../../assets/imgs/paypal.png'
import payment from '../../services/paypal'


class ItemCartPay extends Component {   
    
    state = {
        error: '',
        display: false
    }
  
    componentWillMount() {             
        payment.init(window.document)                
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
        payment.paymentTransaction().then(resp => {
            this.setState({error: resp})
            if(this.state.error) {
                this.setState({display: true})
            }
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
                            <p>Template One</p>                      
                        </div>
                        <div className="column">
                            <p>R$ 65.00</p>                      
                        </div>                    
                    </div>
                    <hr/>
                    <div className="columns">
                        <div className="column">
                            <h3>Total</h3>                        
                        </div>
                        <div className="column">
                            <p>R$ 65.00 <span>
                                <strong>(1x no cartão)</strong>
                            </span></p>                        
                        </div>                                        
                    </div>
                    <div className="columns">
                        <div className="column is-4">
                            <div className="item-imagem">                    
                                <img className="item-img"
                                src={paypalImage} />
                            </div>
                        </div>
                        <div className="column">
                            <div className="pay">
                                <button onClick={() => {this.paymentService()}}>pay</button>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
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

export default withRouter(ItemCartPay)