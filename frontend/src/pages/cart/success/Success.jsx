import './Success.css'
import React, { Component } from 'react'
import Main from '@components/template/Main'
import queryString from 'query-string'
import payment from '../../../services/paypal'

class Success extends Component {   

    componentDidMount() {        
        let values = queryString.parse(this.props.location.search)
        let id = values.paymentId
        let payer = values.PayerID
        this.success(payer, id)       
    }

    componentWillMount() {
        payment.init(window.document)        
    }   

    success = (payer, id) => {
        payment.executePayment(payer, id).then(resp => {
            debugger
            console.log("sucess", resp);
        })     
    }

    render() {
        return (
            <Main>
                <div>sucesso: </div>
                <div>token: </div>                
            </Main>            
        )
    }
}

export default Success