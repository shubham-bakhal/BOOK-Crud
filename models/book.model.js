const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 222
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;