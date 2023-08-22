// Definindo o 'strict mode'
'use strict'

// Realizando as importações
const express = require('express')
const cors = require('cors')
const config = require('./conf/config')
const bookRoutes = require('./routes/book-routes')
const authorRoutes = require('./routes/author-routes')
const publisherRoutes = require('./routes/publisher-routes')

// Inicializando o 'Express'
const app = express()

// Definindo a utilização do JSON no corpo da requisição
app.use(express.json())

// Definindo a utilização do 'cors'
app.use(cors())

// Definindo a utilização do roteador para o recurso 'books'
app.use('/api/books', bookRoutes)

// Definindo a utilização do roteador para o recurso 'author'
app.use('/api/authors', authorRoutes)

// Definindo a utilização do roteador para o recurso 'publisher'
app.use('/api/publishers', publisherRoutes)

// Definindo a porta do servidor e subindo a aplicação
app.listen(config.port, () => {
    console.log('API está rodando em: ' + config.url)
})