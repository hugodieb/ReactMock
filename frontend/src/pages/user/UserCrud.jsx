import './UserCrud.css'
import React, { Component } from 'react'
import Main from '@components/template/Main'
import AppApi from '~apijs'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const initialState = {
    user: { name: '', email: '' },
    list: [],
    validField: true
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
       
        AppApi.getUsers().then(response => {            
            this.setState({ list: response.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        //this.initialState.validField = user.name && user.email ? true : false
        AppApi.saveUser(user).then(response => {
            const list = this.getUpdatedList(response.data)
            this.setState({ user: initialState.user, list })
        })
    }
    
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
        let validField = user.name && user.email ? false : true
        this.setState({ validField })
    }    

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        AppApi.removeUser(user).then(response => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })        
    }

    sortList() {
        let list = this.state.list.sort((a, b) => (a.id) - b.id)
        this.setState({ list })        
    }

    renderForm() {
        return (
                          
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-two-fifths">
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-primary" type="text" name="name"
                                        value={this.state.user.name}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Digite seu nome..." />
                                    </div>
                                </div>
                            </div>
                            <div className="column is-two-fifths">
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-primary" type="text" name="email"
                                        value={this.state.user.email}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Digite seu email..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns is-centered gp-button">
                            <button className="button is-small is-warning"
                                onClick={e => this.save(e)}
                                disabled={this.state.validField}>
                                Salvar
                            </button>
                            <button className="button is-small is-warning has-m-left-5"
                                onClick={e => this.clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>                                                      
            </section>              
                            
        )
    }

    renderTable() {
        return (
            <table className="table is-responsive tbl-users has-m-top-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                        <th><button className="button is-small is-warning"
                                    onClick={() => this.sortList()}>
                                <i className="fa fa-sort" aria-hidden="true"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="button is-small is-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="button is-small is-danger has-m-left-3"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                <hr/>
                {this.renderTable()}
            </Main>
        )
    }
}