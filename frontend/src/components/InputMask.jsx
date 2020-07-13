import React, { Component } from 'react'
import { phone, cpf }  from '../helpers/rules'

const masks = ['cep', 'cpf', 'phone', 'date']

class InputField extends Component {
    
    state = {
        value: ''
    }

    componentDidMount() {                
        this.setState({value: this.props.field})        
        this.whatmask(null, this.props.mask)
    }

    componentDidUpdate(prevProps, prevState) {        
        if(this.props.field !== prevProps.field){
            this.setState({value: this.props.field})
        }        
    }

    whatmask = ( event, masktype) => {                
        return masks.includes(masktype) ? this.selectMask(event, masktype) : ''      
    }

    selectMask = (event, masktype) => {        
        switch(masktype) {
            case 'phone':
                this.phoneMask(event)
                break
            case 'cpf':
                this.cpfMask(event)
                break
            default:                
        }  
    }
    
    phoneMask = e => {              
        let v = ''
        e !== null ? v = e.target.value : v = this.props.field
        if(v !== undefined){
            v = v.replace(/\D/g, "")
            v = v.replace(/^(\d\d)(\d)/g,"($1)$2")
            v = v.length < 13 ? v.replace(/(\d{4})(\d)/, "$1-$2") : v.replace(/(\d{5})(\d)/,"$1-$2")
        }         
        if(e) {            
            e.target.value = v
            phone(e)
            this.setState({value: e.target.value})
            return this.props.onChange(e, v)
        } else {
            this.setState({value: v})
            this.refs.input_masked.value = v
            return this.props.field
        }        
    }

    cpfMask = e => {                
        let v = ''
        e !== null ? v = e.target.value : v = this.props.field
        if(v !== undefined){
           v = v.replace(/\D/g, "")
           v = v.replace(/(\d{3})(\d)/, "$1.$2")
           v = v.replace(/(\d{3})(\d)/, "$1.$2")
           v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") 
        }        
        if(e) {
            e.target.value = v
            cpf(e)
            this.setState({value: e.target.value})
            return this.props.onChange(e, v)
        } else {
            this.setState({value: v})
            this.refs.input_masked.value = v
            return this.props.field
        }
    }

    render() {
        return (
            <input 
                type="text"
                ref="input_masked"
                className={this.props.className}
                name={this.props.name}                
                field={this.props.field}
                onChange={e => this.whatmask(e, this.props.mask)}                                           
            />    
        )
    }

}    

export default InputField