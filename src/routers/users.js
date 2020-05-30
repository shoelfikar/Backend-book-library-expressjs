const express = require('express')
const bcrypt = require('bcrypt')
const Router = express.Router()
const usersController = require('../controller/users')





Router
    .get('/',usersController.getUsers)
    .post('/register',usersController.insertUsers)
    .get('/auth', usersController.authtentication)
    .post('/login',usersController.login)
    .get('/:id_user',usersController.userDetail)
    .delete('/:id_user',usersController.deleteUser)
    .patch('/:id_user',usersController.updateUser)






module.exports = Router;