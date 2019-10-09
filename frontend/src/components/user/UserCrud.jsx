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
            console.log(response.data)
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
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}
                            disabled={this.state.validField}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                        <th><button type="button"
                                    className="btn btn-link btn-sm"
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
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
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
                {this.renderTable()}
            </Main>
        )
    }
}