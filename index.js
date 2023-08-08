// definindo as importações
const express = require('express')
const cors = require('cors')
const firebase = require('firebase')

/**
 * inserindo as configurações para conexão
 * com o Firebase
 */


// inicializando o Firebase
firebase.initializeApp(firebaseConfig)
console.log('Inicializando o firebase...')

/**
 * instânciando o nosso app como sendo
 * pertencente à classe Express
 */
const app = express()

/**
 * habilitando a utilização de JSON no
 * corpo da requisição
 */
app.use(express.json())

/**
 * habilitando o Cors
 */
app.use(cors())

// Criando um novo objeto Firestore
const db = firebase.firestore()

// Definindo qual collection do Firestore iremos salvar os dados
const Book = db.collection('books')


 // criando a nossa primeira rota para teste
 //app.get('/api', (req, res) => {
 // enviando uma resposta para a requisição
 // res.status(200).send({
 //  msg: 'Hello World'
 // })
 // })


 // Criando um recurso para salvar um novo documento na coleção 'books' (post)
app.post('/books', async (req,res) => {
    // Armazenando o corpo da requisição em um objeto
    const data = req.body
    //console.log(data)
    // Inserindo o objeto em uma coleção no firebase
    await Book.add(data)
    // Retornando uma resposta para a requisição
    res.status(201).send({
        msg : 'Livro Salvo!'
    })
})


// Criando um recurso para listar os documentos da coleção 'books' (get)
app.get('/books', async (req,res) => {
    // Criando um objeto para receber o resultado da busca na coleção 'books'
    const snapshot = await Book.get()
    // Criando o objeto que irá receber o JSON com os documentos encontrados no banco
    const books = snapshot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }))
    // retornando uma resposta para o usuario
    res.send(books)
    })


// Criando um recurso para listar um documento específico da coleção 'books' (get)
app.get('/books/:id', async (req,res) => {
    // Criando uma variável para receber o parâmetro ID vindo na requisição
    const id = req.params.id
    // Criando um objeto para receber o resultado da busca na coleção 'books'
    const snapshot = await Book.get()
    // Criando o objeto que irá receber o JSON com os documentos encontrados no banco
    const books = snapshot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }))
    // Filtrando dentro do objeto books para encontrar o documento com o ID igual ao que foi enviado
    // por parametro
    const book = books.filter(b => {
        return b.id == id
    })
    // Enviando a resposta da requisição
    res.send(book)
})


 // Criando um recurso para alterar um documentos da coleção 'books' (PUT)
app.put('/books/:id', async (req,res) => {
    // Criando uma constante para receber o parametro ID que está na requisição
    const id = req.params.id
    // Chamando o método update() do Firebase para atualizar o ducumento 
    //que contenha o ID igual ao que foi fornecido via parâmetro
    await Book.doc(id).update(req.body)
    // Enviando a resposta da requisição
    res.status(203).send({
        msg: 'Livro Alterado!'
    })
})


// Criando um recurso para excluir um documentos da coleção 'books' (DELETE)
app.delete('/books/:id', async (req,res) => {
    // Criando uma constante para receber o parametro id enviado na requisição
    const id = req.params.id
    // Chamando o método 'delete' do firestore
    // para excluir o documento que possui o ID igual ao fornecido por parâmetro
    await Book.doc(id).delete()
    // Enviando uma resposta para a requisição
    res.send({
        msg: 'Livro Excluído!'
    })
})

/**
 * definindo a porta onde o servidor
 * estará 'ouvindo'
 */
app.listen(3000, () => {
console.log('REST API rodando em http://localhost:3000')
})