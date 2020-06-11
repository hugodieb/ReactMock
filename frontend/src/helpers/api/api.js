import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

const api = {
  login(email, password){
      return post('/api/login', {email: email, password: password})
      .then(response => response.data)
  },
  logout(){
      return post('/api/logout').then(response => response.data)
  },
  whoami(){
      return get('/api/whoami').then(response => response.data)
  }, 
  async getTemplates(){
      return get('/api/templates').then(response => response.data)
  },
  async getTemplateDetail(id, name){
    return get('/api/template', {id: id, name: name}).then(response => response.data)
  }, 
  async sale(params){
    return post('')
  }
}
export default api

function get(url, params){
  return axios.get(url, {params: params})
}

function post(url, params){
  var fd = new FormData();
  params = params || {}
  Object.keys(params).map((k) => {
      return fd.append(k, params[k]);
  })
  return axios.post(url, fd);
}
