// Definindo o 'strict mode' do JS'
'use strict'

// Definindo as importações
const dotenv = require('dotenv')
const assert = require('assert')

// Inicializando o 'dotenv'
dotenv.config()

// Criando um objeto que irá conter as variáveis de ambiente
const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env

// Definindo a obrigatoriedade de alguns parâmetros
assert(PORT, 'PORT IS REQUIRED!')
assert(HOST, 'HOST IS REQUIRED!')

// Exportando o módulo
module.exports = {
    port : PORT,
    host : HOST,
    url : HOST_URL,
    firebaseConfig : {
        apiKey : API_KEY,
        authDomain : AUTH_DOMAIN,
        projectId : PROJECT_ID,
        storageBucket : STORAGE_BUCKET,
        messagingSenderId : MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}