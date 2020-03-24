import './Checkout.css'
import React, {Component} from 'react'
import Main from '@components/template/Main'
import AppApi from '~apijs'

class Detail extends Component {

    state = {
        template: {}
    }

    componentWillMount() {                        
       const id = !this.props.location.query || undefined ? null : this.props.location.query.id
       const name = id ? null : this.props.match.params.name
        
       if(id) {
           AppApi.getTemplate(id).then(resp => {
               this.setState({template: resp.data})
           })
        } else {
            AppApi.filterTemplate(name).then(resp => {                
                this.setState({template: resp.data[0]})
            })
        }
    }

    render() {        
        const {template} = this.state

        return <h1>{template.description}</h1>
    }
}

export default Detail