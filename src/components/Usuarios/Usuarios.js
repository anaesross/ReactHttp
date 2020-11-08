import React, { Component } from 'react'

import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

class Usuarios extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usuarios: [
        { id: 1, nome: 'João', sobrenome: 'Silva', email: 'joao@mail.com' },
        { id: 2, nome: 'Maria', sobrenome: 'Santos', email: 'maria@mail.com' }
      ]
    }

    this.adicionarUsuario = this.adicionarUsuario.bind(this)
  }

  adicionarUsuario(usuario) {
    const usuarios = [...this.state.usuarios, usuario]
    this.setState({ usuarios: usuarios })
  }

  removerUsuario(usuario) {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method:'DELETE'
      })
        .then(resposta => {
          if(resposta.status === 204){
            let usuarios = this.state.usuarios
            usuarios = usuarios.filter(x => x.id !== usuario.id)
            this.setState({ usuarios: usuarios })
          }
        })     
    }
  }

  componentDidMount() {//melhor local para solicitar um api, onde o componente já está montado
    //const resposta = fetch('https://reqres.in/api/Users')//fetch = faz requisições a apis, https
    //console.log(resposta) //retorna um promisses(objeto utilizado para processamento assincrono) , o fetch retona um valor que iremos ter no futuro->permite tratamento de erros
    //para obter o valor do fetch, utilizamos o then:
    fetch('https://reqres.in/api/Users')
    //com arrow function
      .then(resposta => resposta.json())
      .then(dados => {
        console.log(dados.data)
    //transformar os dados da API , em dados que nosso componente possa entender
        const usuarios = dados.data.map(usuario => { //percorre a lista de usuários vinda da api
          return {
            id: usuario.id,
            nome: usuario.name,
            ano: usuario.year,
          }
        })
      //console.log(usuarios)
      this.setState( { usuarios : usuarios })
      //quando o nome do objeto é o mesmo nome da variavel podemos escrever igual modo abaixo:
      //this.setState( { usuarios })
    })
    //sem arrow function
    //.then(function(resposta){ //retorna o estado e valor da requisição
      //return resposta.text() //para obter os dados em texto
      //return resposta.json() //para obter os dados em json
    //})
    //.then(function(dados){
      //console.log(dados.data) //recebe os dados acima e imprime no console
    //})
  }
  render() {
    return (
      <>
        <AdicionarUsuario adicionarUsuario={this.adicionarUsuario} />

        {this.state.usuarios.map(usuario => (
          <Usuario key={usuario.id}
            usuario={usuario}
            removerUsuario={this.removerUsuario.bind(this, usuario)}
          />
        ))}
      </>
    )
  }
}

export default Usuarios