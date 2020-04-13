import './ItemCart.css'
import React from 'react'

const ItemCart = () => {
    return (
        <div className="item-cart-parent has-text-centered">
            <div className="item-cart-header"></div>
            <div className="item-cart-child">
                <div className="columns">
                    <div className="column is-4">
                        <div className="item-imagem">                    
                            <img className="item-img"
                             src="https://static.netshoes.com.br/produtos/camisa-corinthians-i-1920-sn-torcedor-nike-masculina/28/HZM-1555-028/HZM-1555-028_vitrine.jpg?ts=1585972809" />
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="item-info">
                            <h5>Template One</h5>
                            <p>
                                <span>
                                    REF: #6484674644   
                                </span>
                            </p>
                            <div className="item-price">
                                <p> <span> R$ 64.99</span> </p>
                                <p>R$ 65.44</p>
                            </div>
                            <div className="subtitle">
                                Suporte: 6 meses            
                            </div>                  
                        </div>  
                    </div>
                    <div className="column is-4 item-discount">
                        <span>
                           30% OFF
                        </span>
                    </div>                    
                </div>            
            </div>
            <hr/>
            <span className="has-text-centered">
                *O download do arquivo de template estará disponível após confirmação
                do pagamento (em até 24horas)*
            </span>
        </div>
    )
}

export default ItemCart

