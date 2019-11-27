import axios from 'axios'
const baseUrl = 'http://localhost:3001'

function mockObject (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({data: data}), 600)
    })
  }

var loggedUser = null

const api = {
    hello() {
        return mockObject({description: 'funfa api mock sjsdjsdh'})
    },
    getUsers() {
        let users = get(baseUrl + `/users`)
        console.log(users)
        return users
    },
    saveUser(user) {
        if (user.id) {
            return put(baseUrl + `/users/${user.id}`, user)
        } else
            return post(baseUrl + `/users`, user)
    },
    removeUser(user) {
        return remove(baseUrl + `/users/${user.id}`, user)        
    },
    login(email, password) {
        if(password) {        
            let dbuser = get(baseUrl + `/user?email=${email}`)
            loggedUser =  dbuser.then(response => loggedUser = response.data[0])
            return mockObject(loggedUser).then(response => response.data)       
        } else
            return mockObject(loggedUser).then(response => response.data)
    },
    
    logout() {
        loggedUser = null
        return mockObject(loggedUser).then(response => response.data)
    },

    whomi() {
        return mockObject(loggedUser ? {
            authenticated: true,
            user: loggedUser
        } : {authenticated: false})
    }
}

export default api

function get(url, params){    
    return axios.get(url, params)
}

function post(url, params){
    return axios.post(url, params)
}

function put(url, params) {
    return axios.put(url, params)
}

function remove(url, params) {
    return axios.delete(url, params)
}