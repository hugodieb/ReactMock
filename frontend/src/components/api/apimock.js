import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'


function mockObject (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({data: data}), 600)
    })
  }  

const api = {
    hello() {
        return mockObject({description: 'funfa api mock'})
    },
    getUsers() {
        let users = get(baseUrl)
        console.log(users)
        return users
    }
}

export default api

function get(url, params){
    return axios.get(url, {params: params});
}