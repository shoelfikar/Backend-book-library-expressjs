const express = require('express');
const Router = express.Router();
const dataController = require('../controller/book');
const redisHelper = require('../helpers/redis')
const auth = require('../helpers/auth')
// multer

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})


Router
    .get('/',redisHelper.cacheGetAllBooks, dataController.getBook)
    .get('/:id_book',dataController.bookDetail)
    .get('/', dataController.sortBook)
    .post('/',upload.single('image'),redisHelper.clearGetAllBooks,dataController.insertBook)
    .patch('/:id_book',redisHelper.clearGetAllBooks, dataController.updateBook)
    .delete('/:id_book',redisHelper.clearGetAllBooks, dataController.deleteBook)




module.exports = Router;