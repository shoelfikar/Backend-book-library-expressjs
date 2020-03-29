const express = require('express');
const Router = express.Router();
const dataController = require('../controller/book');


Router
    .get('/',dataController.getBook)
    .get('/:id_book',dataController.bookDetail)
    .get('/', dataController.sortBook)
    .post('/',dataController.insertBook)
    .patch('/:id_book', dataController.updateBook)
    .delete('/:id_book', dataController.deleteBook)




module.exports = Router;