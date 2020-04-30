import axios from 'axios'

const msg = {
    msgToken: 'Houve um erro de token,\
    tente novamente em alguns minutos',
    msgPayment: 'Houve um erro na ordem de pagamento,\
    tente novamente mais tarde.',
    msgExecute: 'Houve um erro ao executar o pagamento,\
    tente novamente mais tarde'
}

const dataVars = {   
    key_name: process.env.REACT_APP_KEY_NAME,
    pay_executed: {
        error: '',
        data: {}
    } 
}

export default {
    init(document) {                       
        const clientId = process.env.REACT_APP_CLIENT_ID
        let pagarmeScript = document.createElement('script')
        pagarmeScript.setAttribute('src', `https://www.paypal.com/sdk/js?client-id=${clientId}`)
        document.body.appendChild(pagarmeScript)
    },

    async generatedToken()  {               
        const PAYPAL_OAUTH_API = "https://api.sandbox.paypal.com/v1/oauth2/token"               
        const AUTH = {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_CLIENT_PASSWORD,
        }
        const HEADER = {
            Accept: 'application/json',
            'Accept-Language': 'pt_BR',
            'content-type': 'application/x-www-form-urlencoded',
        }
        const PARAMS = {
            grant_type: 'client_credentials'
        }
        try {
            const {data: {access_token}} = await axios({
                url: PAYPAL_OAUTH_API,
                method: 'post', 
                headers: HEADER,
                auth: AUTH,
                params: PARAMS
            })                                   
            localStorage.setItem(dataVars.key_name, access_token)                     
        } catch (error) {                       
            localStorage.removeItem(dataVars.key_name)
            return msg.msgToken          
        }                    
    },

    async paymentTransaction() {                      
        const token = localStorage.getItem(dataVars.key_name)
        const URL = 'https://api.sandbox.paypal.com/v1/payments/payment'
        const HEADER = {
            'Accept-Language': 'pt_BR',
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const PARAMS = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [
                {
                    "amount": {
                        "total": "200.00",
                        "currency": "BRL",
                        "details": {
                            "subtotal": "180.00",
                            "tax": "0",
                            "shipping": "22.00",
                            "handling_fee": "0.00",
                            "shipping_discount": "2.0",
                            "insurance": "0"
                        }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_4035463425371",
                    "invoice_number": "4035463425371",
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "item_list": {
                        "items": [
                            {
                                "name": "React",
                                "description": "React programer",
                                "quantity": "1",
                                "price": "180.00",
                                "tax": "0",
                                "sku": "28",
                                "currency": "BRL"
                            }
                        ],
                        "shipping_address": {
                            "recipient_name": "Sheik Dog Show",
                            "line1": "Minha Rua",
                            "line2": "601",                            
                            "city": "São José dos Campos",
                            "country_code": "BR",
                            "postal_code": "12246-001",
                            "phone": "12944548675",
                            "state": "SP"
                        }
                    }
                }
            ],
            "note_to_payer": "Contact us for any questions on your order.",
            "redirect_urls": {
                "return_url": "http://localhost:3000/sucesso",
                "cancel_url": "http://localhost:3000/cancelamento"
            }           
        }       
        try {
            const {data: {links}} = await axios({
                url: URL,
                method: 'post',
                headers: HEADER,
                data: PARAMS
            })
            debugger          
            if(links.length > 0) {
                links.map(link => {
                    debugger
                    if(link.rel === 'approval_url') {
                        window.location.href = link.href
                    }
                })
            }            
        } catch (error) {
                                 
            return msg.msgPayment
        }        
    },   

    async executePayment(payerId, paymentId) {
               
        const token = localStorage.getItem(dataVars.key_name)
        const URL = `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`
        const   HEADER = {
            'Accept-Language': 'pt_BR',
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const PARAMS = {
            "payer_id": payerId
        }
        try {            
            const { data } = await axios({
                url: URL,
                method: 'post',
                headers: HEADER,
                data: PARAMS
            })            
            if(data.state === 'approved') {
                localStorage.removeItem(dataVars.key_name)
            }
            dataVars.pay_executed.data = data 
            return dataVars.pay_executed
        } catch (error) {
            dataVars.pay_executed.error = msg.msgExecute            
            return dataVars.pay_executed
        }
    }    
}