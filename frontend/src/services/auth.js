import AppApi from '~apijs'

class Auth {
    constructor() {
      this.authenticated = false
    }
    
    authentication() {        
        AppApi.whomi().then(response => {
            debugger
            this.authenticated = response.data.authenticated
        })         
    }
  
    isAuthenticated() {
        return this.authenticated
    }
  }
  
  export default new Auth();
  