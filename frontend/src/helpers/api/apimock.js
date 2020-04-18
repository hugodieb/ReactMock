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
            localStorage.setItem("pegasus", access_token)
            return mockObject(access_token)
          } catch (error) {
            console.log('error: ', error);
        }        
        
    },   

    async paymentPaypal(token) {        
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
                        "total": "20.00",
                        "currency": "BRL",
                        "details": {
                        "subtotal": "15.00",
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "5.00",
                        "shipping_discount": "0",
                        "insurance": "0"
                        }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_75645386957683",
                    "invoice_number": "36452869463",
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },                    
                    "item_list": {
                        "items": [
                            {
                                "name": "dog",
                                "description": "Hot Dog.",
                                "quantity": "1",
                                "price": "10",
                                "tax": "0",
                                "sku": "2",
                                "currency": "BRL"
                            },
                            {
                                "name": "cat",
                                "description": "Black handbag.",
                                "quantity": "1",
                                "price": "5",
                                "tax": "0",
                                "sku": "3",
                                "currency": "BRL"
                            }
                            ],
                            "shipping_address": {
                            "recipient_name": "Mara Santanna",
                            "line1": "Minha rua",
                            "line2": "601 apto 176",
                            "city": "São Jose dos Canpos",
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
            });
            //debugger
            //console.log('access_token: ', links);
            return mockObject(links)
          } catch (error) {
            console.log('error: ', error);
        }                
    },

    async executePayment(token, payerId, paymentId) {
        try {
            //debugger
            const { data: {data}} = await axios({
                url: `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                method: 'post',
                headers: {                
                    'Accept-Language': 'en_US',
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                data: {
                    "payer_id": payerId
                }
            })
            debugger
            console.log(data);  
            return data
        } catch (error) {
            debugger
            return error
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