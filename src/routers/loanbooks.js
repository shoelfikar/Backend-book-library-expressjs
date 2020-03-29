const express = require('express')
const Router = express.Router()
const loanController = require('../controller/loanbooks')


Router
    .get('/',loanController.getLoan)
    .get('/:id_loan',loanController.detailLoan)
    .post('/borrow',loanController.insertLoan)
    .patch('/:id_loan',loanController.updateLoan)
    .delete('/:id_loan',loanController.deleteLoan)





module.exports = Router