// Definindo as importações
const express = require('express')
const cors = require('cors')
const firebase = require('firebase')

// Inserindo as configurações para conexão com o Firebase

const firebaseConfig = {
    apikey: '',
    authDomain:'',
    projectId:'',
    storageBucket:'',
    messagingSenderId:'',
    appId:''
}

// Inicializando o Firebase
//firebase.initializeApp(firebaseConfig)

/**
 * Instânciando o nosso app como sendo 
 * pertencente à classe Express
 */

const app = express()

/** 
 * Habilitando a utilização de JSON no 
 * corpo da requisição
 */

app.use(express.json())

/** 
 * Habilitando o Cors
*/

app.use(cors())

/** 
 * Criando a nossa primeira rota 
 * para teste
 */

app.get('/api', (req,res) => {
    // Enviando uma resposta para a requisição
    res.statusCode(200).send({
        msg: 'Hello World'
    })
})

// Definindo a porta onde o servidor estará 'Ouvindo'

app.listen(3000, () => {
    console.log('REST API rodando em http://localhost:3000')
})