// Definindo os 'imports'
const firebase = require('firebase')
const config = require('./config')

// Inicializando o 'Firebase'
const db = firebase.initializeApp(config.firebaseConfig)

// Exportando o módulo
module.exports = db
