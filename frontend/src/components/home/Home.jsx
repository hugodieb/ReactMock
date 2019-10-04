import React from 'react'
import Main from '@components/template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Seu projeto React com uso de dados mock">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema de cadastro desenvolvido em React!</p>
    </Main>