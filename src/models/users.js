const connection = require('../configs/db')
const bcrypt = require('bcrypt')

module.exports = {
    getUsers: ()=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM user", (err,result)=> {
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
            connection.query("INSERT INTO user SET ?",data,(err,result)=> {
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
            connection.query("SELECT * FROM user WHERE email = ?",email,(err,result)=> {
                if(!err){
                    resolve(result[0])
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    userDetail:(id_user) => {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM user WHERE id_user = ?",id_user, (err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateUser: (id_user,data) => {
        return new Promise((resolve,reject)=> {
            connection.query("UPDATE user SET ? WHERE id_user =?",[data,id_user],(err,result)=> {
                if(!err){
                    resolve(result)
                }else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteUser: (id_user)=> {
        return new Promise((resolve,reject)=> {
            connection.query("DELETE FROM user WHERE id_user = ?",id_user, (err,result)=> {
                if(!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}