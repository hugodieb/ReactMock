import './ItemCart.css'
import React from 'react'
import { connect } from 'react-redux'

const ItemCart = props => {
    debugger
    const { template } = props
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
                            <h5>{template.title}</h5>
                            <p>
                                <span>
                                    REF: #{template.sku}   
                                </span>
                            </p>
                            <div className="item-price">
                                <p> <span> R$ {template.price}</span> </p>
                                <p>R$ {template.pricePay}</p>
                            </div>
                            <div className="subtitle">
                                Suporte: 6 meses            
                            </div>                  
                        </div>  
                    </div>
                    <div className="column is-4 item-discount">
                        <span>
                           {template.discount} OFF
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

const mapStateToProps = store => ({    
    template: store.templateDetail.response
})

export default  connect(mapStateToProps)(ItemCart)

