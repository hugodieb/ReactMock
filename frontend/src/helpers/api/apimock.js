import axios from 'axios'
const baseUrl = 'http://localhost:3001'

function mockObject (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({data: data}), 600)
    })
  }

let loggedUser = null

const api = {
    hello() {
        return mockObject({description: 'funfa api mock sjsdjsdh'})
    },
    getUsers() {
        let users = get(baseUrl + `/users`)        
        return users
    },
    saveUser(user) {
        if (user.id) {
            return put(baseUrl + `/users/${user.id}`, user)
        } else
            return post(baseUrl + `/users`, user)
    },
    saveProfile(user) {        
        if (user.id) {
            return put(baseUrl + `/user`, user)
        }
    },
    removeUser(user) {
        return remove(baseUrl + `/users/${user.id}`, user)        
    },
    async getTemplates() {
        let templates = get(baseUrl + `/templates`)
        return mockObject(templates).then(response => response.data)
    },
    async getTemplateDetail(id) {        
        let template = get(baseUrl + `/template?id=${id}`)
        template = template.then(response => response.data)
        return mockObject(template).then(response => response.data)
    },
    async filterTemplate(name) {       
        let template = get(baseUrl + `/template?name=${name}`)
        template = template.then(response => response.data)
        return mockObject(template).then(response => response.data)
    },
    async login(email, password) {        
        if(password) {        
            let dbuser = get(baseUrl + `/user`)
            loggedUser =  dbuser.then(response => loggedUser = response.data)
            return mockObject(loggedUser).then(response => response.data)       
        } else
            return mockObject(loggedUser).then(response => response.data)
    },
    
    async logout() {
        loggedUser = null
        return mockObject(loggedUser).then(response => response.data)
    },

    whomi() {
        return mockObject(loggedUser ? {
            authenticated: true,
            user: loggedUser
        } : {authenticated: false})
    },

    async getTokenPaypal() {      
        const PAYPAL_OAUTH_API = "https://api.sandbox.paypal.com/v1/oauth2/token"
        const AUTH = {
            username: 'AZ-ZY7oH0r_xO-fdIK1DXqOvXkndkBb6daWTjT0dK5UiCNNYAZSrQQQ9Nq5XStccEZZ90zsAuXQ1dxmb',
            password: 'EG9LG36da1egjF0ETsGosheaoCx1Zja-VN2QrMGEywCFvBboN711DSRzPc265Y3Y0Bvn_Jsld-sQrV5t',
          }
          const HEADER = {
            Accept: 'application/json',
            'Accept-Language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          }
          const PARAMS = {
            grant_type: 'client_credentials'
          }
        try {
            //debugger
            const { data: { access_token } } = await axios({
              url: PAYPAL_OAUTH_API,
              method: 'post',
              headers: HEADER,
              auth: AUTH,
              params: PARAMS,
            });
        
            console.log('access_token: ', access_token);
            return mockObject(access_token)
          } catch (error) {
            console.log('error: ', error);
        }        
        
    },   

    async paymentPaypal(token) {
        //debugger
        const tk = `Bearer ${token}`
        try {
            const {data: { links }} = await axios({
              url: 'https://api.sandbox.paypal.com/v1/payments/payment',
              method: 'post',
              headers: {                
                'Accept-Language': 'en_US',
                'content-type': 'application/json',
                'Authorization': tk
              },             
              data: {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                    {
                    "amount": {
                        "total": "16.00",
                        "currency": "BRL",
                        "details": {
                        "subtotal": "15.00",
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "1.00",
                        "shipping_discount": "0",
                        "insurance": "0"
                        }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_90048630024435",
                    "invoice_number": "48787589673",
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "soft_descriptor": "ECHI5786786",
                    "item_list": {
                        "items": [
                        {
                            "name": "hat",
                            "description": "Hot Dog.",
                            "quantity": "1",
                            "price": "5",
                            "tax": "0",
                            "sku": "1",
                            "currency": "BRL"
                        },
                        {
                            "name": "handbag",
                            "description": "Black handbag.",
                            "quantity": "1",
                            "price": "10",
                            "tax": "0",
                            "sku": "product34",
                            "currency": "BRL"
                        }
                        ],
                        "shipping_address": {
                        "recipient_name": "Brian Robinson",
                        "line1": "4th Floor",
                        "line2": "Unit #34",
                        "city": "San Jose",
                        "country_code": "US",
                        "postal_code": "95131",
                        "phone": "011862212345678",
                        "state": "CA"
                        }
                    }
                    }
                ],
                "note_to_payer": "Contact us for any questions on your order.",
                "redirect_urls": {
                    "return_url": "http://localhost:3000/perfil",
                    "cancel_url": "http://localhost:3000/"
                }
                
              }
            });
            //debugger
            console.log('access_token: ', links);
            return mockObject(links)
          } catch (error) {
            console.log('error: ', error);
        }                
    },

    async executePayment(token, payerId, paymentId) {

        try {
            const { data: {data}} = await axios({
                url: `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': token
                },
                data: {
                    "payer_id": payerId
                }
            })
            return data
        } catch (error) {
            
        }
    }
}

export default api

function get(url, auth, params){    
    return axios.get(url, auth, params)
}

function post(url, auth, params){
    debugger
    return axios.post(url, auth, params)
}

function put(url, params) {
    return axios.put(url, params)
}

function remove(url, params) {
    return axios.delete(url, params)
}