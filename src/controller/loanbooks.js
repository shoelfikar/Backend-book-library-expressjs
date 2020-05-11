const loanModel = require('../models/loanbooks')
const helper = require('../helpers/helpers')


module.exports = {
    insertLoan: (req,res)=> {
        const {
            id_user,
            book_id,
            // status
        } = req.body
        const data = {
            id_user,
            book_id,
            status: 'active'
        }
        loanModel.insertLoan(data)
        .then((result)=> {
            helper.response(res,result,200)
        })
        .catch((err)=> {
            helper.response(res,result,404,err)
        })
    },
    updateLoan: (req,res)=> {
        const idLoan = req.params.id_loan
        const {
            id_user,
            book_id,
            status,
            forfeit
        } = req.body
        const data = {
            id_user,
            book_id,
            status,
            forfeit
        }
        loanModel.updateLoan(idLoan,data)
        .then((result)=> {
            helper.response(res,result,200,[idLoan,data])
        })
        .catch((err)=> {
            helper.response(res,null,404,err)
        })
    },
    getLoan: (erq,res)=> {
        loanModel.getLoan()
        .then((result)=> {
            helper.response(res,result,200)
        })
        .catch((err)=> {
            helper.response(res,null,404,err)
        })
    },
    detailLoan: (req,res)=> {
        const idLoan = req.params.id_loan
        loanModel.detailLoan(idLoan)
        .then((result)=> {
             helper.response(res,result,200)
        })
        .catch((err)=> {
            helper.response(res,null,404,err)
        })
    },
    deleteLoan: (req,res)=> {
        const id_loan = req.params.id_loan
        loanModel.deleteLoan(id_loan)
        .then((resultLoan)=> {
            const result = resultLoan
            helper.response(res,result,200)
        })
        .catch((err)=>{
            helper.response(res,result,404,err)
        })
    },
    
}