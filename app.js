const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const Router = require('./src/routers/index');
app.use('/',Router);
// app.get('/author',Router)
app.listen(port, ()=>{
  console.log(`App Listen post ${port}`);
})