const connection = require('../configs/db');

module.exports = {
    // getBooks: (search,sort,page)=> {
    //     return new Promise((resolve,reject)=>{
    //         if(search){
    //             connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_title LIKE ? OR description LIKE ?",[`%${search}%`,`%${search}%`], (err,result)=>{
    //                 if(!err){
    //                     resolve(result)
    //                 }else{
    //                     reject(new Error(err))
    //                 }
    //             })
    //         }else if(page) {
    //             connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category ORDER BY book_id DESC  LIMIT  0,10", (err,result)=> {
    //                 if(!err) {
    //                     resolve(result)
    //                 }else {
    //                     reject(new Error(err))
    //                 }
    //             })
    //         }else if(sort) {
    //             connection.query("SELECT * FROM book_data ORDER BY " + sort + ' DESC',(err,result)=> {
    //                 if(!err){
    //                     resolve(result)
    //                 }else {
    //                     reject(new Error(err))
    //                 }
    //             })
    //         }else{
    //             connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_data.book_id", (err,result)=>{
    //                 if(!err){
    //                     resolve(result)
    //                 }else{
    //                     reject(new Error(err))
    //                 }
    //             })
    //         }
    //     })
    // },
    getData: () => {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM book_data", (err, result)=> {
                if(!err) {
                    resolve(result);
                }else {
                    reject(new Error(err))
                }
            })
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
    sortBook : ()=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT book_data.*, category.name_category FROM book_data INNER JOIN category on book_data.id_category = category.id_category WHERE book_data.book_id ORDER BY author", (err,result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
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
        const dataPage = 5;
        const totalPage = total / dataPage;
        const firstDate = dataPage * page - dataPage;

        return new Promise((resolve,reject)=> {
            connection.query("SELECT * FROM book_data ORDER BY book_id ASC LIMIT ?, ?",[firstDate, dataPage], (err,result)=> {
                if(!err){
                    const thisPage = Math.ceil(totalPage);
                    if(page <= thisPage){
                        resolve([thisPage, `Current Page: ${page}`,result])
                    }
                }else {
                    reject(new Error(err))
                }
            })
        })
    }
}