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
const fileFilter = (req, file, cb) => {
    const allowTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowTypes.includes(file.mimetype)) {
        cb({message: 'only image allowed!'})
    } else {
        cb(null, true)
    }
}

const upload = multer({
    storage : storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  
})


Router
    .get('/',dataController.getBook)
    .get('/:id_book',dataController.bookDetail)
    .get('/', dataController.sortBook)
    .post('/',upload.single('image'),dataController.insertBook)
    .patch('/:id_book',dataController.updateBook)
    .delete('/:id_book',dataController.deleteBook)




module.exports = Router;