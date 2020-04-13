import './ItemCartPay.css'
import React from 'react'
import paypal from '../../assets/imgs/paypal.png'

const ItemCartPay = () => {
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
                    <div className="column">
                        <div className="item-imagem">                    
                            <img className="item-img"
                            src={paypal} />
                        </div>
                    </div>
                    <div className="column">
                        <div className="pay">
                            <a className="button is-large" >
                                Pagamento
                            </a>                            
                        </div>
                    </div>
                </div>
                <hr/>
                <p>*Pagamento seguro com Paypal*</p>
            </div>
        </div>
    )
}

export default ItemCartPay