const express = require('express');
const Router = express.Router()
const categoryController = require('../controller/category')


Router
    .get('/',categoryController.getCategory)
    .get('/:id_user', categoryController.categoryDetail)
    .post('/category',categoryController.insertCategory)
    .patch('/:id_category',categoryController.updateCategory)




module.exports = Router