const bookModel = require('../models/book');
const helpers = require('../helpers/helpers');
const conn = require('../configs/db');
module.exports = {
    // getBooks: (req,res)=> {
    //     const search = req.query.search;
    //     const page = req.query.page
    //     const sort = req.query.sort
    //    bookModel.getBooks(search,sort)
    //    .then((result)=> {
    //        res.send(result)
    //    })
    //    .catch((response)=> {
    //        console.log(response)
    //    })
    //      conn.query("SELECT COUNT(*) as total FROM book_data",(err,result)=> {
    //          const total = result[0].total
    //          if(page > 0) {
    //              bookModel.getPage(page,total)
    //              .then(result => {
    //                  helpers.response(res,result, 200)
    //              })
    //              .catch((err)=> {
    //                  helpers.response(res, {}, res.status,err)
    //              })
    //          }
    //      })
    // },
    getData: (req,res)=> {
        const page = req.query.page
        !page
        ? bookModel
            .getData()
            .then((result)=> {
                helpers.response(res,result, 200)
            })
            .catch(err => {
                helpers.response(res,{}, res.status, err)
            })
        : conn.query("SELECT COUNT(*) as total FROM book_data", (err, result)=> {
            const total = result[0].total;
            if(page > 0 ) {
                bookModel.getPage(page, total)
                .then((result)=> {
                    helpers.response(res,result, 200)
                })
                .catch((err)=> {
                    helpers.response(res, {}, res.status,err)
                })
            }
        })
    },
    bookDetail : (req,res)=> {
        const idBook = req.params.id_book
        bookModel.bookDetail(idBook)
        .then((result)=>{
            res.send(result);
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    sortBook : (req,res)=> {
        // const author = req.params.myAuthor
        bookModel.sortBook()
        .then((result)=> {
            res.send(result);
            // console.log(result)
        })
        .catch((response)=> {
            console.log(response);
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
            res.send(result);
        })
        .catch((response)=> {
            console.log(response);
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
