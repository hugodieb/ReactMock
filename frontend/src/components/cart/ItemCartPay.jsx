import './ItemCartPay.css'
import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import paypal from '../../assets/imgs/paypal.png'
import AppApi from '~apijs'
import PaypalExpressBtn from 'react-paypal-express-checkout'

//let PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

class ItemCartPay extends Component {
     
    /*
    componentWillMount() {
        let pagarmeScript = document.createElement('script')
        pagarmeScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AZ-ZY7oH0r_xO-fdIK1DXqOvXkndkBb6daWTjT0dK5UiCNNYAZSrQQQ9Nq5XStccEZZ90zsAuXQ1dxmb')
        document.head.appendChild(pagarmeScript)
    }*/    

    getToken = () => {
       AppApi.getTokenPaypal().then(resp => {
           //debugger
           console.log("tokk", resp);
           //this.pagamento(resp.data)
       })
    }
    
    pagamento(token) {
        AppApi.paymentPaypal(token).then(resp => {
            debugger
            console.log('id pagamento', resp);
        }) 
    }

    
    render() {
        const client = {
            sandbox: "AZ-ZY7oH0r_xO-fdIK1DXqOvXkndkBb6daWTjT0dK5UiCNNYAZSrQQQ9Nq5XStccEZZ90zsAuXQ1dxmb",
            production: "aa"
          }                

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
                                src={paypal} />
                            </div>
                        </div>
                        <div className="column">
                            <div className="pay">
                                <PaypalExpressBtn client={client} currency={"BRL"} total={3231.50}
                                    style= {
                                        {'size': 'medium',
                                        'color': 'blue',
                                        'shape': 'rect',
                                        'label': 'pay'}
                                        }
                                /> <button onClick={this.getToken}>pay</button>                                                                                       
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

export default ItemCartPay