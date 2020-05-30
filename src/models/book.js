const connection = require('../configs/db');
// eslint-disable-next-line no-unused-vars
const helpers = require('../helpers/helpers')

module.exports = {
    getBook: (search)=>{
        return new Promise((resolve,reject)=> {
            if(search){
                connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_title LIKE ? OR description LIKE ? ORDER BY book_data.book_id",[`%${search}%`,`%${search}%`], (err, result)=> {
                    if(!err) {
                        resolve(result)  
                    }else {
                        reject(new Error(err))
                    }
                })
            }else{
                connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_data.book_id ORDER BY book_data.book_id", (err,result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))

                    }
                }) 
            }
        })
    },
    bookDetail: (id_book)=> {
        return new Promise((resolve,reject)=> {
                connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_data.book_id = ? ",id_book, (err,result)=> {
                    if(!err){
                        resolve(result)
                    }else {
                        reject(new Error(err));
                    }
                })
        })
    },
    sortBook:(sort)=>{
        return new Promise((resolve,reject)=> {
            connection.query(
                `SELECT * FROM book_data ORDER BY ${sort} ASC`, (err,result)=> {
                    if(!err){
                        resolve(result)
                    }else{
                        reject(new Error(err))
                    }
                }
            )
        })
    },
    insertBook: (data)=> {
        return new Promise((resolve,reject)=> {
            connection.query("INSERT INTO book_data SET ?", data,(err,result)=> {
                if(!err) {
                    resolve(result)
                }else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateBook : (id_book,data) => {
        return new Promise((resolve,reject)=> {
            connection.query("UPDATE book_data SET ? WHERE book_id= ?", [data,id_book], (err,result)=> {
                if(!err) {
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
    deleteBook: (id_book)=> {
        return new Promise((resolve,reject)=> {
            connection.query("DELETE FROM book_data WHERE book_id = ?", id_book, (err,result)=> {
                if(!err){
                    resolve(result);
                }else {
                    reject(new Error(err));
                }
            })
        })
    },
    getPage: (page, total)=> {
        const dataPage = 12;
        const totalPage = total / dataPage;
        const firstDate = dataPage * page - dataPage;
        return new Promise((resolve,reject)=> {
            connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_data.book_id ORDER BY book_data.book_id LIMIT ?, ?",[firstDate, dataPage], (err,result)=> {
                if(!err){
                    const thisPage = Math.ceil(totalPage);
                    resolve([thisPage,`Total Data : ${total}`,`Current Page: ${page}`,result])
                }else {
                    reject(new Error(err))
                }
            })
        })
    }
}