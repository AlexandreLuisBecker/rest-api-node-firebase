// Realizando as importações
const express = require('express')
const {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController')

// Inicializando o serviço de roteamento do express
const router = express.Router()

// Criando as rotas para o resouce Books

// Rota para listar todos os livros
router.get('/books', getAllBooks)

// Rota para listar um livro específico
router.get('/books/:id', getBook)

// Rota para cadastrar um novo livro
router.post('/books', addBook)

// Rota para atualizar um livro específico
router.put('/books/:id', updateBook)

// Rota para excluir um livro específico
router.delete('/books/:id', deleteBook)

module.exports = {
    routes : router
}
