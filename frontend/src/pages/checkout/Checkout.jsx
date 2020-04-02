import './Checkout'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { templateDetailAction } from '../../actions/templateDetail'

class Checkout extends Component {

    state = {
        template: {}
    }

    componentWillMount() {
        debugger
        const { templateDetail } = this.props
        this.setState({template : templateDetail})
    }

    render() {
        return(
            <h1>{this.state.template.title}</h1>
        )
    }
}

const mapStateToProps = store => ({  
    templateDetail: store.templateDetail.response
})

export default connect(mapStateToProps)(Checkout)