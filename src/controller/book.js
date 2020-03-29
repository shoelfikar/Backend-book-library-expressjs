const bookModel = require('../models/book');
const helpers = require('../helpers/helpers');
const conn = require('../configs/db');
module.exports = {
    getBook: (req,res)=> {
        const page = req.query.page
        const search = req.query.search
        !page
        ? bookModel
            .getBook(search)
            .then((resultBook)=> {
                const result = resultBook
                helpers.response(res,result, 200)
            })
            .catch(err => {
                helpers.response(res,{}, res.status, err)
            })
         :conn.query("SELECT COUNT(*) as total FROM book_data", (err, result)=> {
            const total = result[0].total;
            bookModel.getPage(page, total)
            .then((result)=> {
                if(page > 0 ) {
                    helpers.response(res,result, 200)
                }else {
                    helpers.response(res, {}, res.status,404)
                }
            })
            .catch((err)=> {
                helpers.response(res, {}, res.status,err,404)
            })
        })
    },
    bookDetail : (req,res)=> {
        const idBook = req.params.id_book
        bookModel.bookDetail(idBook)
        .then((result)=>{
            helpers.response(res,result,);
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    sortBook : (req,res)=> {
        const sort = req.query.sort
        bookModel.sortBook(sort)
        .then((result)=> {
            helpers.response(res,result, 200);
        })
        .catch((err)=> {
           helpers.response(res, {}, res.status,404,err)
        })
    },
    insertBook : (req,res)=> {
        const {
            isbn,
            book_title,
            author,
            description,
            book_status,
            id_category,
            publisher
        } = req.body;
        const data = {
            isbn,
            book_title,
            author,
            description,
            book_status,
            id_category,
            publisher
        }
        bookModel.insertBook(data)
        .then((result)=> {
            helpers.response(res,result, 200);
        })
        .catch((err)=> {
            helpers.response(res, {}, res.status,404,err)
        })
    },
    updateBook : (req,res)=> {
        const idBook = req.params.id_book
        const {
            isbn,
            book_title,
            author,
            description,
            book_status,
            id_category,
            publisher
        } = req.body;
        const data = {
            isbn,
            book_title,
            author,
            description,
            book_status,
            id_category,
            publisher
        }
        bookModel.updateBook(idBook,data)
        .then((result)=> {
            res.send(result);
        })
        .catch(err => console.log(err));
    },
    deleteBook : (req,res)=> {
       const idBook = req.params.id_book
       bookModel.deleteBook(idBook)
       .then((result)=> {
           res.send(result);
       })
       .catch(err => console.log(err));
    }
}
