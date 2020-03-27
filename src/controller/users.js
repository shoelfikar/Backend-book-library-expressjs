const usersModel = require('../models/users');
const helpers = require('../helpers/helpers');
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
            password
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password,salt)
        usersModel.insertUsers(data)
        .then((result)=> {
            res.send(result)
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
                password
            }
            const results = compareSync(data.password,result.password)
            if(results) {
                return helpers.response(res,result,200, 'Login Successfully')
            }else {
                return helpers.response(res,null,403, 'Your password Wrong!')
            }
        })
    }
}