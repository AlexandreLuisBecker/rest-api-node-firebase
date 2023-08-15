// Definindo a classe 'Book'
class Book {
    // Implementando o 'construtor da classe'
    constructor (
        id,
        titulo,
        tituloOriginal,
        genero,
        anoLancamento
    ) {
        this.id = id
        this.titulo = titulo,
        this.tituloOriginal = tituloOriginal,
        this.genero = genero,
        this.anoLancamento = anoLancamento
    }
}

module.exports = Book