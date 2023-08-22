// definindo o strict mode
'use strict'

// Realizando as importações
const express = require('express')
const controller = require('../controllers/bookController')
// Inicializando o serviço de roteamento do express
const router = express.Router()

// Instanciando um novo objeto da classe controller
let _ctrl = new controller()

// definindo as rotas

router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getById)
router.post('/', _ctrl.post)
router.put('/:id', _ctrl.put)
router.delete('/:id', _ctrl.delete)

module.exports = router
