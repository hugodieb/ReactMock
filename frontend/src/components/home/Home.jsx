import React, {Component} from 'react'
import Main from '@components/template/Main'
import { connect } from 'react-redux'

class Home extends Component {
    state = {
        inputValue: ''
    }

    inputChange = e => {
        this.setState({inputValue: e.target.value})        
    }

    render() {
        const { 
            clickButton,            
            newValue
         } = this.props

        const {
            inputValue } = this.state
        
        return (
            <Main icon="home" title="Início"
                subtitle="Seu projeto React com uso de dados mock">
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0">Sistema de cadastro desenvolvido em React!</p>
                <h1>{newValue}</h1>
                <input type="text" onChange={this.inputChange} value={inputValue}/>
                <button onClick={() => clickButton(inputValue)}>Troca a Mensagem</button>               
            </Main>
        )
    }
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue    
  })

  export default connect(mapStateToProps)(Home)