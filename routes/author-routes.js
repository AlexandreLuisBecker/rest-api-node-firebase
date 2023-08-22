// Realizando as importações
const express = require('express')
const {
    addAuthor,
    getAllAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController')

// Inicializando o serviço de roteamento do express
const router = express.Router()

// Criando as rotas para o resouce Authors

// Rota para listar todos os Autors
router.get('/author', getAllAuthors)

// Rota para listar um Autor específico
router.get('/author/:id', getAuthor)

// Rota para cadastrar um novo Autor
router.post('/author',  addAuthor)

// Rota para atualizar um Autor específico
router.put('/author/:id', updateAuthor)

// Rota para excluir um Autor específico
router.delete('/author/:id', deleteAuthor)

module.exports = {
    routes : router
}
