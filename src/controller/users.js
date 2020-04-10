// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users');
const helpers = require('../helpers/helpers');
const nodeMailer = require('nodemailer')
const {genSaltSync,compareSync,hashSync} = require('bcrypt')

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
            email,
            phone_number,
            address,
            id_card,
            type,
            username,
            password
        } = req.body;
        const data = {
            fullname,
            email,
            phone_number,
            address,
            id_card,
            type,
            username,
            password,
            token
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password,salt)
        usersModel.insertUsers(data)
        .then((result)=> {
            helpers.response(res,result,200);
        })
        .catch(err => console.log(err))
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
            tokenKu = jwt.sign({email: email}, process.env.SECRET_KEY)
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
            id_card,
            username
        } = req.body
        const data = {
            fullname,
            email,
            phone_number,
            address,
            id_card,
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
    verifyEmail: (req,res) => {
        const activetoken = req.headers['x-token']
        const tokenactive = jwt.verify(activetoken,'library')
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOption = {
            from: 'jaguchiuchiha@gmail.com',
            to: tokenactive.email,
            subject: subject,
            text: 'Success'
        }

        transporter.sendMail(mailOption, (err)=>{
            if(err){
                res.send('email failed')
            }else{
                helpers.response(res,result,200, err)
            }
        })
    }
}