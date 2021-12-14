const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`   
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        precoComDesconto: Float
    }

    # Pontos de entrada da sua API
    type Query {
        ola: String!
        hora_atual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
               return produto.preco - (produto.preco * produto.desconto)
            } else {
                return produto.preco
            }
        }
    },

    Usuario: {
        salario(props) {
            return props.salario_real
        }
    },

    Query: {
        ola () {
            return 'Bom dia'
        },
        hora_atual () {
            // var today = new Date();
            //return today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Davi',
                email: 'email@gmail.com',
                idade: 12,
                salario_real: 131.12,
                vip: true,
        }},
        
        produtoEmDestaque() {
            return {
                nome: 'Pastel',
                preco: 100,
                desconto: 0.5, 
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})