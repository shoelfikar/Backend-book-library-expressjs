const connection = require('../configs/db');

module.exports = {
    getCategory: ()=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM category",(err,result)=> {
                if(!err) {
                    resolve(result)
                }else {
                    reject(new Error(err))
                }
            })
        })
    },
    categoryDetail: (id_user)=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT category.name_category, book_data.* FROM category INNER JOIN book_data ON category.id_category = book_data.id_category WHERE name_category = ?", id_user,(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    insertCategory: (data) => {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO category SET ?",data,(err,result)=> {
                if(!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }

            })
        })
    },
    updateCategory: (id_category,data)=> {
        return new Promise((resolve,reject)=> {
            connection.query("UPDATE category SET ? WHERE id_category =?",[data,id_category],(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}