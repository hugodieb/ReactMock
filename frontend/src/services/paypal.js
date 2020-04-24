import axios from 'axios'

const dataVars = {      
    error: '',
    links: [],
    key_name: process.env.REACT_APP_KEY_NAME 
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
            return this.paymentTransaction()         
        } catch (error) {                       
            localStorage.removeItem(dataVars.key_name)
            dataVars.error = {'generatedToken': error.response.statusText}
        }                    
    },

    async paymentTransaction() {
        debugger                
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
                        "total": "257.00",
                        "currency": "BRL",
                        "details": {
                            "subtotal": "257.00",
                            "tax": "0",
                            "shipping": "0",
                            "handling_fee": "0.00",
                            "shipping_discount": "0",
                            "insurance": "0"
                        }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_4035463425368",
                    "invoice_number": "4035463425368",
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "item_list": {
                        "items": [
                            {
                                "name": "python",
                                "description": "python programer",
                                "quantity": "1",
                                "price": "257.00",
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
            dataVars.links = links            
        } catch (error) {
            localStorage.removeItem(dataVars.key_name)            
            dataVars.error = {'paymentTransaction': error.response.statusText}
            dataVars.links = []      
        }        
    },   

    async executePayment(payerId, paymentId) {
        debugger        
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
            return data
        } catch (error) {
            localStorage.removeItem(dataVars.key_name)
            return dataVars.error = error.response.statusText
        }
    },
    
    initPayment() {
        return (
        this.generatedToken().then(() => {
            if(!dataVars.error){
                debugger
                console.log("links", dataVars.links);
                let links = dataVars.links
                links.map(link => {                    
                    if(link.rel === 'approval_url') {
                        window.location.href = link.href                
                    }
                })
            } else {
                return dataVars.error
            }
        })
        )                         
    }
}