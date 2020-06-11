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
        let templates = get(baseUrl + `/templates`).then(response => response.data)
        return mockObject(templates).then(response => response.data)
    },
    async getTemplateDetail(id, name) {
        let template = id ?
         get(baseUrl + `/template?id=${id}`).then(response => response.data)
         : get(baseUrl + `/template?name=${name}`).then(response => response.data) 
        return mockObject(template).then(response => response.data)      
    },   
    async sale(params) {        
        let sale = get(baseUrl + `/invoicePayment?id=${params.id}`)
        sale = sale.then(response => response.data)
        return mockObject(sale).then(response => response.data)
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
        return mockObject({}).then(response => response.data)
    },

    async whoami() {
        return mockObject(loggedUser ? {
            authenticated: true,
            user: loggedUser
        } : {authenticated: false}).then(response => response.data)
    }    
}

export default api

function get(url, auth, params){    
    return axios.get(url, auth, params)
}

function post(url, auth, params){    
    return axios.post(url, auth, params)
}

function put(url, params) {
    return axios.put(url, params)
}

function remove(url, params) {
    return axios.delete(url, params)
}