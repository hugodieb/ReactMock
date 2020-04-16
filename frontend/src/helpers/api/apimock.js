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
        //debugger
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

    async getTokenPaypall() {        
        //debugger
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
          const options = {              
                headers: { 
                    'Accept': 'application/json', 
                    'Accept-Language': 'en_US',
                    'Content-Type':'application/x-www-form-urlencoded'                     
                },
                params: { 'grant_type':'client_credentials' }
          }
        try {
            //const { data: { access_token } } = await axios({
            //  url: PAYPAL_OAUTH_API,
            //  method: 'post',
            //  headers: HEADER,
            //  auth: AUTH,
            //  params: PARAMS,
            //});

            const tok = await post(PAYPAL_OAUTH_API, AUTH, { params: options })
        
            console.log('access_token: ', tok);
            return mockObject(tok)
          } catch (error) {
            console.log('error: ', error);
        }        
        
    },

    async paymentPaypal(token) {
        //debugger
        try {
            const { data: { state } } = await axios({
              url: 'https://api.sandbox.paypal.com/v1/payments/payment',
              
              headers: {                
                'Accept-Language': 'en_US',
                'content-type': 'application/json',
                'Authorization': 'Bearer A21AAGnsavkooHM5yhbniw9EgdTk-tJ6oEASOpkUShJzo41Cyh9u6nXdA8OBapq16QaDkrTV4Rdh2YRiFUn_82V67XRx0QYaA'
              },             
              data: {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                    {
                    "amount": {
                        "total": "99.11",
                        "currency": "USD",
                        "details": {
                        "subtotal": "99.00",
                        "tax": "0.07",
                        "shipping": "0.03",
                        "handling_fee": "1.00",
                        "shipping_discount": "-1.00",
                        "insurance": "0.01"
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
                            "quantity": "5",
                            "price": "3",
                            "tax": "0.01",
                            "sku": "1",
                            "currency": "USD"
                        },
                        {
                            "name": "handbag",
                            "description": "Black handbag.",
                            "quantity": "1",
                            "price": "15",
                            "tax": "0.02",
                            "sku": "product34",
                            "currency": "USD"
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
                    "return_url": "https://example.com/return",
                    "cancel_url": "https://example.com/cancel"
                }
                
              }
            });
            debugger
            console.log('access_token: ', state);
            return mockObject(state)
          } catch (error) {
            console.log('error: ', error);
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