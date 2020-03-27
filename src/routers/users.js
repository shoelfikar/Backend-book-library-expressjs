const express = require('express')
const bcrypt = require('bcrypt')
const Router = express.Router()
const usersController = require('../controller/users')





Router
    .get('/',usersController.getUsers)
    .post('/register',usersController.insertUsers)
    .post('/login',usersController.login)






module.exports = Router;