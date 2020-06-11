import AppApi from '~apijs'

class Auth {
    constructor() {
      this.authenticated = false
    }
    
    authentication() {        
        return (        
            AppApi.whoami().then(response => {
                debugger                               
                this.authenticated = response.authenticated
            })
        )         
    }
  
    isAuthenticated() {
        return this.authenticated
    }
  }
  
  export default new Auth();
  