const express = require('express');
const Router = express.Router();
const dataController = require('../controller/book');


Router
    // .get('/',dataController.getBooks)
    .get('/',dataController.getData)
    .get('/:id_book',dataController.bookDetail)
    .get('/author', dataController.sortBook)
    .post('/',dataController.insertBook)
    .patch('/:id_book', dataController.updateBook)
    .delete('/:id_book', dataController.deleteBook)




// Router.get('/author', dataController.sortBook)
module.exports = Router;