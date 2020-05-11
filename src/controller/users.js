// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users');
const helpers = require('../helpers/helpers');
const nodeMailer = require('nodemailer')
const {genSaltSync,compareSync,hashSync} = require('bcrypt')
const connection = require('../configs/db')

module.exports = {
    getUsers : (req,res)=> {
        usersModel.getUsers()
        .then((result)=> {
            res.send(result)
        })
        .catch((response)=> {
            console.log(response)
        })
    },
    insertUsers : (req,res) => {        
        const {
            fullname,
            username,
            email,
            phone_number,
            // address,
            // id_card,
            password
        } = req.body;
        const data = {
            fullname,
            username,
            email,
            phone_number,
            password,
            photo: 'https://cdn.clipart.email/b2f7a538d5d324b85f87c30fff789114_user-icon-clipart_600-600.svg',
            status : 0,
            // address,
            // id_card,
            type: 'user',
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password,salt)
        usersModel.insertUsers(data)
        .then((result)=> {
            result.email = data.email
            const resultNew = result
            const token = jwt.sign({id: result.insertId,email: result.email},process.env.SECRET_KEY)
            resultNew.token = token
            const transporter = nodeMailer.
            createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            const mailFrom = {
                from: process.env.EMAIL,
                to: 'sulfikardi25@gmail.com',
                subject: 'Registrasi Akun',
                html: '<p>Click<a href="http://localhost:8080/auth/?activated=' + token+'">here</a></p>'
            }
            transporter.sendMail(mailFrom, (err,info)=> {
                if(err){
                    res.send('Email Activation Failed!')
                }else {
                    const result = {
                        token: tokenactivate,
                        status: 'success'
                    }
                    helpers.response(res,result,200);
                }
            })
            helpers.response(res,resultNew,200, 'Registrer Success Please Check Your Email');
        })
        .catch(err =>{
            helpers.response(res,err,201, 'Register Failed')
        })
    },
    login: (req,res)=> {
        const {
            email,
            password
        } = req.body
        const data = {
            email,
            password
        }
        usersModel.login(data.email)
        .then(result => {
            const data = {
                email,
                password,
            }
            const results = compareSync(data.password,result.password)
            let tokenKu = result.token
            tokenKu = jwt.sign({email: result.email}, process.env.SECRET_KEY)
            if(results) {
                // result.password = undefined
                result.token = undefined
                return res.json({
                    token: tokenKu,
                    result: result
                })
                // tokenKu
                // console.log(tokenKu)
                // helpers.response(res,result,200,'Login Successfully',tokenKu)
            }else {
                helpers.response(res,null,403, 'Your password Wrong!')
            }
            
        })
        .catch((err)=> {
            helpers.response(res,err,403, 'Failed Login!')
        })
        // const token = jwt.sign({email: email}, process.env.SECRET_KEY)
        // console.log(token)
        // result.token = token
    },
    userDetail: (req, res) => {
        const idUser = req.params.id_user
        usersModel.userDetail(idUser)
        .then((result)=> {
            helpers.response(res,result,200);
        })
        .catch((err)=> {
            helpers.response(res,result,403,err)
        })
    },
    updateUser: (req,res) => {
        const idUser = req.params.id_user
        const {
            fullname,
            email,
            phone_number,
            address,
            // id_card,
            username
        } = req.body
        const data = {
            fullname,
            email,
            phone_number,
            address,
            // id_card,
            username
        }
        usersModel.updateUser(idUser,data)
        .then((resultUser)=> {
            const result = resultUser
            helpers.response(res,result,200,[idUser,data])
        })
        .catch((err)=> {
            helpers.response(res,results,404,err)
        })
    },
    deleteUser: (req,res)=> {
        const id_user = req.params.id_user
        usersModel.deleteUser(id_user)
        .then((resultUser)=> {
            const result = resultUser
            helpers.response(res,result,200)
        })
        .catch((err)=> {
            helpers.response(res,result,403,err)
        })
    },
    authtentication: (req,res)=> {
        const reqtoken = req.query.activated
        const verify = jwt.verify(reqtoken, process.env.SECRET_KEY)
        const status = {
            status: 1
        }
        connection.query(`UPDATE user SET status = ${status.status} WHERE id_user = ${verify.id}`, (err,result)=> {
            if(err){
                helpers.response(res,err,202,'Failed Activation')
            }
            helpers.response(res,result,200, 'Success Activation')
        })
    }
}