// Definindo o 'strict mode'
'use strict'

// Definindo os imports
const firebase = require('../conf/db')
const Author = require('../models/author')

// Fazendo a chamada para inicializar o Firebase
const firestore = firebase.firestore()

// Criando o método para adicionar um novo livro (POST)
const addAuthor = async (req, res, next) => {
    try {
        // Criando uma constante para receber o conteúdo do corpo da requisição
        const data = req.body
        // Executando o método da classe 'Firestore' que irá gravar o objeto (novo documento) no banco
        await firestore
                .collection('authors')
                .doc()
                .set(data)
    // Retornando uma mensagem ao usuário
    res
        .status(201)
        .send('Author salvo com sucesso!')
    } catch {error} {
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para listar todos os Autores (GET)
const getAllAuthors = async (req, res, next) => {
    try{
    // Criando um objeto para receber a coleção 'authors'
    const authors = await firestore
                            .collection('authors')
    // Criando uma constante para receber os documentos da coleção 'authors'
    const data = await authors.get()
    // Criando um 'array' vazio para receber os authors
    const authorsArray = []
    // Testando se foram encontrados os documentos
    if (data.empty) {
        // Retornando uma mensagem caso não tenham sido encontrados os documentos
        res
            .status(404)
            .send('Não há Autores cadastrados!')
    } else {
        // Criando uma estrutura de repetição para iterar sobre cada docmento da coleção
        data.forEach(doc => {
            // Criando um novo objeto da classe 'Author' para cada documento
            const author = new Author(
                doc.id,
                doc.data().nome,
                doc.data().genero,
                doc.data().nacionalidade,
                doc.data().nascimento
            )
            // Inserindo o objeto recém criado no 'array'
            authorsArray.push(author)
        })
        // retornando a resposta da requisição
        res
            .status(200)
            .send(authorsArray)
    }
    } catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para listar um Autor específico (GET)
const getAuthor = async (req, res, next) => {
try {
       //criando um objeto para receber o 'id' da requisição
    const id = req.params.id
       //criando um objeto para receber o resultado da consulta no 'FireStore'
    const author = await firestore
                        .collection('authors')
                        .doc(id)
       // Criando um novo objeto para receber apenas os dados do documento
    const data = await author.get()
       // testando se existe um documento válido
    if (!data.exists) {
        res
            .status(404)
            .send('Não foi encontrado um Autor com o ID informado')
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

// Criando o método para atualizar um Autor específico (PUT)
const updateAuthor = async (req, res, next) => {
    try{
        //Criando um parâmetro para receber o 'id' da requisição
        const id = req.params.id
        // Criando um constante para receber o corpo da requisição
        const data = req.body
        // Criando um novo objeto para receber o resultado da consulta que irá buscar pelo documento a ser alterado
        const author = await firestore
                                .collection('authors')
                                .doc(id)
        // Realizando a alteração dos dados
        await author.update(data)
            res
                .status(201)
                .send('Autor atualizado com sucesso!')
    } catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

// Criando o método para excluir um Autor específico (DELETE)
const deleteAuthor = async (req, res, next) => {
    try{
        // Criando uma constante para receber o parâmetro id da requisição
        const id = req.params.id
        // Realizando a exclusão do documento
        await firestore
                .collection('authors')
                .doc(id)
                .delete()
        res
            .status(200)
            .send('Autor excluído com sucesso!')
    }catch(error){
        res
            .status(400)
            .send(error.message)
    }
}

module.exports = {
    addAuthor,
    getAllAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
}