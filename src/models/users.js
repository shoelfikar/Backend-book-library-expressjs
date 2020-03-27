const connection = require('../configs/db')
const bcrypt = require('bcrypt')

module.exports = {
    getUsers: ()=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM pengguna", (err,result)=> {
                if(!err) {
                    resolve(result)
                }else {
                    reject(new Error(err))
                }
            })
        })
    },
     insertUsers: (data)=> {
        return new Promise((resolve,reject)=> {
            connection.query("INSERT INTO pengguna SET ?",data,(err,result)=> {
                if(!err) {
                    resolve(result)
                }else {
                    reject(new Error(err))
                }
            })
        })
    },
    login: (email)=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM pengguna WHERE email = ?",email,(err,result)=> {
                if(!err){
                    resolve(result[0])
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}