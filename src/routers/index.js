const express = require('express');
const book = require('./book');
const user = require('./users');
const category = require('./category')
const loanBooks = require('./loanbooks')

const Router = express.Router();
Router
  .use('/library', book)
  // .use('/author', book)
  .use('/user', user)
  .use('/category',category)
  .use('/borrowbooks',loanBooks)
  .get('/', function (req, res) {
    throw new Error('BROKEN',res) 
  })
module.exports = Router;