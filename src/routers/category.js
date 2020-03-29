const express = require('express');
const Router = express.Router()
const categoryController = require('../controller/category')


Router
    .get('/',categoryController.getCategory)
    .get('/:id_user', categoryController.categoryDetail)




module.exports = Router