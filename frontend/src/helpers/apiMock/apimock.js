import axios from 'axios'
const baseUrl = 'http://localhost:3001'


let loggedUser = null

function mockObject (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({data: data}), 600)
    })
  }  

const api = {
    hello() {
        return mockObject({description: 'funfa api mock cjhsdcbsdcbs'})
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
    login() {
        return hello()                
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