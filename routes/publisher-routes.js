// Realizando as importações
const express = require('express')
const {
    addPublisher,
    getAllPublisher,
    getPublisher,
    updatePublisher,
    deletePublisher
} = require('../controllers/publisherController')

// Inicializando o serviço de roteamento do express
const router = express.Router()

// Criando as rotas para o resouce Publisher

// Rota para listar todos os livros
router.get('/publishers', getAllPublisher)

// Rota para listar um livro específico
router.get('/publishers/:id', getPublisher)

// Rota para cadastrar um novo livro
router.post('/publishers', addPublisher)

// Rota para atualizar um livro específico
router.put('/publishers/:id', updatePublisher)

// Rota para excluir um livro específico
router.delete('/publishers/:id', deletePublisher)

module.exports = {
    routes : router
}
