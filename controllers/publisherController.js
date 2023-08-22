// Definindo o 'strict mode'
'use strict'

// Definindo os imports
const firebase = require('../conf/db')
const Publisher = require('../models/publisher')

// Fazendo a chamada para inicializar o Firebase
const firestore = firebase.firestore()

// Criando o método para adicionar um novo Publisher (POST)
const addPublisher = async (req, res, next) => {
    try {
        // Criando uma constante para receber o conteúdo do corpo da requisição
        const data = req.body
        // Executando o método da classe 'Firestore' que irá gravar o objeto (novo documento) no banco
        await firestore
                .collection('publishers')
                .doc()
                .set(data)
    // Retornando uma mensagem ao usuário
    res
        .status(201)
        .send('Publisher salvo com sucesso!')
    } catch {error} {
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para listar todos os Publishers (GET)
const getAllPublisher = async (req, res, next) => {
    try{
    // Criando um objeto para receber a coleção 'publishers'
    const publishers = await firestore
                            .collection('publishers')
    // Criando uma constante para receber os documentos da coleção 'publishers'
    const data = await publishers.get()
    // Criando um 'array' vazio para receber os Publishers
    const publishersArray = []
    // Testando se foram encontrados os documentos
    if (data.empty) {
        // Retornando uma mensagem caso não tenham sido encontrados os documentos
        res
            .status(404)
            .send('Não há Publishers cadastrados!')
    } else {
        // Criando uma estrutura de repetição para iterar sobre cada docmento da coleção
        data.forEach(doc => {
            // Criando um novo objeto da classe 'publisher' para cada documento
            const publisher = new Publisher(
                doc.id,
                doc.data().nome,
                doc.data().pais,
                doc.data().site,
                doc.data().contato
            )
            // Inserindo o objeto recém criado no 'array'
            publishersArray.push(publisher)
        })
        // retornando a resposta da requisição
        res
            .status(200)
            .send(publishersArray)
    }
    } catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para listar um Publisher específico (GET)
const getPublisher = async (req, res, next) => {
try {
       //criando um objeto para receber o 'id' da requisição
    const id = req.params.id
       //criando um objeto para receber o resultado da consulta no 'FireStore'
    const publisher = await firestore
                        .collection('publishers')
                        .doc(id)
       // Criando um novo objeto para receber apenas os dados do documento
    const data = await publisher.get()
       // testando se existe um documento válido
    if (!data.exists) {
        res
            .status(404)
            .send('Não foi encontrado um Publisher com o ID informado')
    }else{
        res
            .status(200)
            .send(data.data())
    }
} catch(error) {
    res
        .status(400)
        .send(error.message)
}
}

// Criando o método para atualizar um Publisher específico (PUT)
const updatePublisher = async (req, res, next) => {
    try{
        //Criando um parâmetro para receber o 'id' da requisição
        const id = req.params.id
        // Criando um constante para receber o corpo da requisição
        const data = req.body
        // Criando um novo objeto para receber o resultado da consulta que irá buscar pelo documento a ser alterado
        const publisher = await firestore
                                .collection('publishers')
                                .doc(id)
        // Realizando a alteração dos dados
        await book.update(data)
            res
                .status(201)
                .send('Publisher atualizado com sucesso!')
    } catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para excluir um Publisher específico (DELETE)
const deletePublisher = async (req, res, next) => {
    try{
        // Criando uma constante para receber o parâmetro id da requisição
        const id = req.params.id
        // Realizando a exclusão do documento
        await firestore
                .collection('publishers')
                .doc(id)
                .delete()
        res
            .status(200)
            .send('Publisher excluído com sucesso!')
    }catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

module.exports = {
    addPublisher,
    getAllPublisher,
    getPublisher,
    updatePublisher,
    deletePublisher
}