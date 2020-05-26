import React, { Component } from 'react'
import queryString from 'query-string'
import payment from '../../../services/paypal'
import Main from '@components/template/Main'
import SuccessPay from '@components/cart/Success'
import Loading from '@components/loading'

class Success extends Component {
    
    state = {        
        data: {},
        termineted: false,
        loading: false
    }

    componentWillMount() {
        payment.init(window.document)                       
        let values = queryString.parse(this.props.location.search)
        let id = values.paymentId
        let payer = values.PayerID
        this.executePayment(payer, id)             
    }   

    executePayment(payer, id) {                
        payment.executePayment(payer, id).then(resp => {
            this.setState({data: resp, termineted: true})                                           
        })     
    }   

    render() {
        const { data, termineted } = this.state                      
        return (
            <Main>
                <aside className="cart-success">
                    {termineted
                        ? <SuccessPay data={data}/>
                        : <Loading />
                    }
                </aside>                                                   
            </Main>            
        )
    }
}

export default Success