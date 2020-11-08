import React, { Component } from 'react'

import './AdicionarUsuario.css'


class AdicionarUsuario extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      usuario: { nome: '', sobrenome: '', email: '' } 
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(event) {
    const { name, value } = event.target
    this.setState({ usuario: { ...this.state.usuario, [name]: value } })
  }

  onSubmitHandler(event) {
    event.preventDefault()
    //const id = Math.floor(Math.random() * 1000)
    //const usuario = { ...this.state.usuario, id }
    const usuario = this.state.usuario

    fetch('https://reqres.in/api/Users', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(usuario) //converte o valor em JSON
    })
      .then(resposta => resposta.json())
      .then(dados => {
        console.log(dados)
        this.setState({ usuario: { id: '', nome: '', ano: '' } })
        this.props.adicionarUsuario(usuario)
      })
    }

  render() {
    return (
      <div className="AdicionarUsuario">
        <h2>Adicionar Usuário</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="Linha">
            <div className="Coluna">
              <label>ID</label>
              <input
                type="text"
                name="id"
                value={this.state.usuario.id}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
            <div className="Coluna">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={this.state.usuario.nome}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <div className="Linha">
            <div className="Coluna">
              <label>Ano</label>
              <input
                type="text"
                name="ano"
                value={this.state.usuario.ano}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <button type="submit">
            Adicionar
        </button>
        </form>
      </div>
    )
  }
}

export default AdicionarUsuario