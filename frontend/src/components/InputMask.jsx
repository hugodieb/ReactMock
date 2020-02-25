import React, { Component } from 'react'

const masks = ['cep', 'cpf', 'phone', 'date']

class InputField extends Component {
    
    state = {
        value: ''
    }

    componentDidMount() {
        this.setState({value: this.props.value})        
        this.whatmask(null, this.props.mask)
    }

    whatmask = ( event, masktype) => {        
        return masks.includes(masktype) ? this.selectMask(event, masktype) : ''      
    }

    selectMask = (event, masktype) => {
        switch(masktype) {
            case 'phone':
                this.phone(event)
        }  
    }
    
    phone = (e) => {
        let v = ''
        e !== null ? v = e.target.value : v = this.props.value              
        v = v.replace(/\D/g, "")
        v = v.replace(/^(\d\d)(\d)/g,"($1)$2")
        v = v.replace(/(\d{5})(\d)/,"$1-$2")
        if(e) {
            e.target.value = v
            this.setState({value: e.target.value})
            return this.props.onChange(e, v)
        } else {
            this.setState({value: v})
            return this.props.value
        }        
    }

    render() {
        return (
            <input 
                type="text"
                ref="input_masked"
                className={this.props.className}
                name={this.props.name}
                value={this.state.value}
                onChange={e => this.whatmask(e, this.props.mask)}                                                      
            />    
        )
    }

}    

export default InputField