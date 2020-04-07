import './Checkout'
import React, { Component } from 'react'
import { connect } from 'react-redux'


class Checkout extends Component {

    state = {
        template: {}
    }

    componentDidMount() {        
        const { templateDetail } = this.props
        this.setState({template : templateDetail})
    }

    render() {
        return(
            this.state.template ? <h1>{this.state.template.title}</h1> : <h1>sem template</h1>
        )
    }
}

const mapStateToProps = store => ({  
    templateDetail: store.templateDetail.response
})

export default connect(mapStateToProps)(Checkout)