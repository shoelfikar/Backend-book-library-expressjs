const express = require('express');
const book = require('./book');
const user = require('./users');
// const category = require('./category')

const Router = express.Router();
Router
  .use('/library', book)
  // .use('/author', book)
  .use('/user', user)
  // .use('/category')
module.exports = Router;