const rules = {
    isValidPhone (phone) {
        const message = 'Digite um telefone válido'
                
        const valid = phone.match(/^[0-9\-\s()]+$/) !== null
        return valid
    }
}

export default rules