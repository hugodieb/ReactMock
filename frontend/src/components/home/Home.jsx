import React from 'react'
import Main from '@components/template/Main'
import { connect } from 'react-redux';

const main =  props => 
    <Main icon="home" title="Início"
        subtitle="Seu projeto React com uso de dados mock">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema de cadastro desenvolvido em React!</p>
        <h1>{props.newValue}</h1>
    </Main>

const mapStateToProps = store => ({
    newValue: store.clickState.newValue
  });

export default connect(mapStateToProps)(main);
// export default main