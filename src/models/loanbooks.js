const connection = require('../configs/db')

module.exports = {
    insertLoan: (data)=> {
        return new Promise((resolve,reject)=> {
            connection.query("INSERT INTO loan_books SET ?",data,(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    updateLoan: (id_loan,data)=> {
        return new Promise((resolve,reject)=> {
            connection.query("UPDATE loan_books SET ? WHERE id_loan =?",[data,id_loan],(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getLoan: ()=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT loan_books.*, user.fullname,user.phone_number,user.email,user.username, book_data.book_title, book_data.author, book_data.isbn FROM loan_books INNER JOIN user on loan_books.id_user = user.id_user INNER JOIN book_data on loan_books.book_id = book_data.book_id WHERE loan_books.id_loan ORDER BY loan_books.id_loan", (err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    deleteLoan: (id_loan)=> {
        return new Promise((resolve,reject)=> {
            connection.query("DELETE FROM loan_books WHERE id_loan = ?",id_loan,(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    detailLoan: (id_loan)=> {
        return new Promise((resolve,reject)=> {
            connection.query("SELECT loan_books.*, user.fullname,user.phone_number,book_data.isbn,book_data.book_title,book_data.author FROM loan_books INNER JOIN user ON loan_books.id_user = user.id_user INNER JOIN book_data ON loan_books.book_id = book_data.book_id  WHERE loan_books.id_user = ?", id_loan,(err,result)=> {
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}