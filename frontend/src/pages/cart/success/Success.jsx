import './Success.css'
import React, { Component } from 'react'
import queryString from 'query-string'
import payment from '../../../services/paypal'
import Main from '@components/template/Main'
import SuccessPay from '@components/cart/Success'

class Success extends Component {
    
    state = {        
        data: {}
    }

    componentWillMount() {
        payment.init(window.document)
        debugger        
        let values = queryString.parse(this.props.location.search)
        let id = values.paymentId
        let payer = values.PayerID
        this.executePayment(payer, id)        
    }   

    executePayment(payer, id) {
        debugger
        payment.executePayment(payer, id).then(resp => {
            debugger
            this.setState({data: resp})            
        })     
    }

    render() {
        const { data } = this.state                
        return (
            <Main>
                <aside className="cart-success">
                    <SuccessPay data={data}/>
                </aside>               
                                                     
            </Main>            
        )
    }
}

export default Success