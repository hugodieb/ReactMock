import './Success.css'
import React, { Component } from 'react'
import Main from '@components/template/Main'
import queryString from 'query-string'
import AppApi from '~apijs'

class Success extends Component {   

    componentDidMount() {
        debugger
        let values = queryString.parse(this.props.location.search)
        let id = values.paymentId
        let payer = values.PayerID
        this.success(id, payer)       
    }

    componentWillMount() {
        let pagarmeScript = document.createElement('script')
        pagarmeScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AZ-ZY7oH0r_xO-fdIK1DXqOvXkndkBb6daWTjT0dK5UiCNNYAZSrQQQ9Nq5XStccEZZ90zsAuXQ1dxmb')
        document.body.appendChild(pagarmeScript)        
    }
    
    //componentDidMount() {
    //    let pagarmeScript = document.createElement('script')        
    //    pagarmeScript.setAttribute('src', 'https://www.paypalobjects.com/api/checkout.js')
    //    document.body.appendChild(pagarmeScript)
    //}

    success = (id, payer) => {
        debugger        
        let pegasus = localStorage.pegasus
        AppApi.executePayment(pegasus, payer, id).then(resp => {
            debugger
            console.log("executado", resp);
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