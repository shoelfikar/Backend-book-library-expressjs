const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : '',
  database : process.env.database
});
 
connection.connect((err)=> {
  
  if(err) console.log(`Error database : ${err}`);
});

module.exports = connection;