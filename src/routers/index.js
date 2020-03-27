const express = require('express');
const book = require('./book')
const user = require('./users');

const Router = express.Router();
Router
  .use('/library', book)
  // .use('/author', book)
  .use('/user', user)
// // sdf
module.exports = Router;