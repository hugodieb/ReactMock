import './Snackbar.css'
import React, { Component } from 'react'
import { snackbarClose } from '../actions/snackbar'
import { connect } from 'react-redux'

class Snackbar extends Component {      

    initProps = {}
    show = 'none'
    timer = null

    componentWillUpdate(newprops, newstate) {
        this.initProps = {... newprops.snackbar }
        if(this.show === 'none') {
            this.show = 'block'
            this.closed()
        }else {
            this.show = 'none'
            if(this.timer){
                clearTimeout(this.timer);
            }            
        }                    
    }
    
    styless = () => {        
        const style = {
            'background': this.initProps.color,
            'display': this.show
        }
        return style
    }

    classname = () => {
        let color = !this.initProps.color ? 'default' : this.initProps.color
        let clss = this.show === `none` ? color+= ' snackbar' : color+= ' snackbar show'        
        return clss        
    }

    closed = () => {
        this.timer = setTimeout(() => {
            this.props.dispatch(snackbarClose())
        }, this.initProps.timeout)
                
    }

    message = () => {
        return this.initProps.message
    }    

    render() {               
        return (
            <div className={this.classname()}  style={this.styless()}>
                <span>{this.message()} ㋡</span> 
            </div>     
        )
    }

}

const mapStateToProps = store => ({  
    snackbar: store.snackbar
  })

export default connect( mapStateToProps )(Snackbar)