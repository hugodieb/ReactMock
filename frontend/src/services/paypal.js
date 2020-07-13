import axios from 'axios'

const dataVars = {   
    key_name: process.env.REACT_APP_KEY_NAME,
    pay_executed: {
        error: '',
        data: {}
    } 
}

const dataTo = {    
    token: {
        PAYPAL_OAUTH_API: "https://api.sandbox.paypal.com/v1/oauth2/token",
        AUTH: {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_CLIENT_PASSWORD,
        },
        HEADER: {
            'Accept-Language': 'pt_BR',
            'Accept': 'application/json',            
            'content-type': 'application/x-www-form-urlencoded'
        },
        PARAMS: {
            grant_type: 'client_credentials'
        }
    }           
}

const msg = {
    msgToken: 'Houve um erro de token,\
    tente novamente em alguns minutos',
    msgPayment: 'Houve um erro na ordem de pagamento,\
    tente novamente mais tarde.',
    msgExecute: 'Houve um erro ao executar o pagamento.\
    Por algum motivo não ocorreu a cobrança. Tente novamente mais tarde'
}

export default {
    init(document) {                       
        const clientId = process.env.REACT_APP_CLIENT_ID
        let pagarmeScript = document.createElement('script')
        pagarmeScript.setAttribute('src', `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=BRL`)
        document.body.appendChild(pagarmeScript)
    },

    getToken() {
        return localStorage.getItem(dataVars.key_name)
    },

    async generatedToken()  {      
        try {            
            const {data: {access_token}} = await axios({
                url: dataTo.token.PAYPAL_OAUTH_API,
                method: 'post', 
                headers: dataTo.token.HEADER,
                auth: dataTo.token.AUTH,
                params: dataTo.token.PARAMS
            })                                   
            localStorage.setItem(dataVars.key_name, access_token)                     
        } catch (error) {
            console.log(error);                                   
            localStorage.removeItem(dataVars.key_name)
            return msg.msgToken          
        }                    
    },

    async paymentTransaction(invoice) {
        const token = this.getToken()
        const URL_PAYMENT = 'https://api.sandbox.paypal.com/v1/payments/payment'        
        const HEADER = {
            'Accept-Language': 'pt_BR',
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }      
        const PARAMS = this.getInvoicePayment(invoice)    
        try {                
            const {data: {links}} = await axios({
                url: URL_PAYMENT,
                method: 'post',
                headers: HEADER,
                data: PARAMS
            })                      
            if(links.length > 0) {
                links.map(link => {                    
                    if(link.rel === 'approval_url') {
                        window.location.href = link.href
                    }
                })
            }            
        } catch (error) {
            console.log(error);                                             
            return msg.msgPayment
        }        
    },
    
    async paymentDetail(paymentId) {
        const URL = `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}`
        const token = this.getToken()
        const   HEADER = {
            'Accept-Language': 'pt_BR',
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        
        try {            
            const { data } = await axios({
                url: URL,
                method: 'get',
                headers: HEADER                
            })
            return data
        } catch (error) {            
            dataVars.pay_executed.error = msg.msgExecute            
            return dataVars.pay_executed
        }
    },

    async executePayment(payerId, paymentId) {       
        const URL = `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`
        const token = this.getToken()
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
            if(error.response.data.name === '"DUPLICATE_TRANSACTION"') {
                dataVars.pay_executed.error = ''
            }                      
            return dataVars.pay_executed
        }
    },
    
    getInvoicePayment(invoice) {        
        const invoice_number = process.env.NODE_ENV === 'development'
         ? Math.floor(Math.random() * invoice.invoice_number) : invoice.invoice_number 

        return {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [
                {
                    "amount": {
                        "total": invoice.total,
                        "currency": "BRL",
                        "details": {
                            "subtotal": invoice.subtotal,
                            "tax": "0.00",
                            "shipping": "0.00",
                            "handling_fee": "0.00",
                            "shipping_discount": "0.00",
                            "insurance": "0.00"
                        }
                    },
                    "description": "The payment transaction.",
                    "custom": "EBAY_EMS_" + invoice_number,
                    "invoice_number": invoice_number,
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "item_list": {
                        "items": invoice.items
                    }
                }
            ],
            "note_to_payer": "Contact us for any questions on your order.",
            "redirect_urls": {
                "return_url": "http://localhost:3000/sucesso",
                "cancel_url": "http://localhost:3000/cancelamento"
            }           
        }
    }
}