const bookModel = require('../models/book');
const helpers = require('../helpers/helpers');
const conn = require('../configs/db');
require('dotenv').config()
const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS)

module.exports = {
   getBook:(req,res)=>{ 
        const page = req.query.page
        const search = req.query.search
        !page
         ?bookModel
            .getBook(search)
            .then((result)=> {
                // const result = resultBook
                client.setex('getallbooks',3600,JSON.stringify(result))
                helpers.response(res,result, 200)
            })
            .catch(err => {
                helpers.response(res,{}, res.status, err)
            })
         :conn.query("SELECT COUNT(*) as total FROM book_data", (err, result)=> {
            const total = result[0].total;
            if(page > 0) {
                bookModel
                .getPage(page,total)
                .then(result => {
                    helpers.response(res,result, 200) 
                })
                .catch(err => {
                    helpers.response(res, {}, res.status,err,404)
                })
            }
        })
    },
    bookDetail : (req,res)=> {
        const idBook = req.params.id_book
        bookModel.bookDetail(idBook)
        .then((result)=>{
            helpers.response(res,result,200);
        })
        .catch((response)=>{
            console.log(response);
        })
    },
    sortBook:(req,res)=>{
        const sort = req.params.sort
        bookModel.sortBook(sort)
        .then((result)=>{
            if(sort > 0){
                helpers.response(res,err,404,'Keyword yang anda masukkan tidak sesuai') 
            }else{
                helpers.response(res,result,200,`Sort Data Berdasarkan ${sort}`)
            }
        })
        .catch((err)=>{
            helpers.response(res,err,404,'Keyword yang anda masukkan tidak sesuai')
        })
    },
    insertBook : (req,res)=> {
        const {
            isbn,
            book_title,
            author,
            description,
            // image,
            book_status,
            id_category,
            publisher
        } = req.body;
        const data = {
            isbn,
            book_title,
            author,
            description,
            image: `http://localhost:8000/uploads/${req.file.filename}`,
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
            helpers.response(res,result, 200);
        })
        .catch(err => console.log(err));
    },
    deleteBook : (req,res)=> {
       const idBook = req.params.id_book
       bookModel.deleteBook(idBook)
       .then((result)=> {
            helpers.response(res,result, 200);
       })
       .catch(err => console.log(err));
    }
}
