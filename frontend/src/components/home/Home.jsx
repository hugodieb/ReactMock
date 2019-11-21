import React, {Component} from 'react'
import Main from '@components/template/Main'
import { connect } from 'react-redux'

class Home extends Component {
    state = {
        inputValue: '',
        userLogged: false
    }

    inputChange = e => {
        this.setState({inputValue: e.target.value})        
    }

    render() {
        const { 
            clickButton,            
            newValue,
            authenticated } = this.props

        const {
            inputValue } = this.state
        
        return (
            <Main icon="home" title="Início"
                subtitle="Seu projeto React com uso de dados mock"
                authenticated={authenticated}>
                <div className='display-4'>Bem Vindo!</div>
                <hr />
                <p className="mb-0">Sistema de cadastro desenvolvido em React!</p>
                <h1>{newValue}</h1>
                <input type="text" onChange={this.inputChange} value={inputValue}/>
                <button onClick={() => clickButton(inputValue)}>Troca a Mensagem</button>
                
                {authenticated
                 ? <div className="alert alert-primary mt-2" role="alert">
                    Estou logado!
                </div>
                 : <div className="alert alert-warning mt-2" role="alert">
                    Não estou mais logado!                    
                </div>
                }
            </Main>
        )
    }
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue,
    authenticated: store.authLogin.authenticated
  })

  export default connect(mapStateToProps)(Home)