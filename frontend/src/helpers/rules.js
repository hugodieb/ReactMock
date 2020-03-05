import { validarCpf }  from './validarCpf'

export const phone = (event) => {        
    let phone = event.target.value || ""
    //phone =  phone.replace(/\D/g, "")
    if(!phone) {
        event.target.setCustomValidity('Kd o telefone ?')
    } else if(!/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(phone)) {
        event.target.setCustomValidity('Formato telefone inválido...')        
    } else {
        event.target.setCustomValidity("")
    }               
}

export const email = (event) => {    
    const email = event.target.value || ""    
    if(!email) {
        event.target.setCustomValidity('Kd o email ?')
    } else if(!/\S+@\S+\.\S+/.test(email)) {
        event.target.setCustomValidity('Formato do email parece incorreto!')
    } else {
        event.target.setCustomValidity("")
    }
    
}

export const fullname = (event) => {    
    const name = event.target.value || ""
    if(!name) {
        event.target.setCustomValidity('Kd seu nome ?')
    } else if(!/[A-Z][a-z]* [A-Z][a-z]*/.test(name)) {
        event.target.setCustomValidity('Seu nome deve ter nome e sobrenome separados...')
    } else {
        event.target.setCustomValidity("")
    }
    
}

export const cpf = event => {
    const cpf = event.target.value || ""
    if(!cpf) {
        event.target.setCustomValidity('Kd seu cpf ?')
    } else if(!validarCpf(cpf) ) {
        event.target.setCustomValidity('Seu cpf parece inválido...')
    } else {
        event.target.setCustomValidity("")
    }
}

