const categoryModel = require('../models/category');
const helpers = require('../helpers/helpers');


module.exports = {
    getCategory: (req, res) => {
        categoryModel.getCategory()
        .then((result) => {
            helpers.response(res,result,200)   
        }).catch((err) => {
            helpers.response(res,null,400,err)
        });
    },
    categoryDetail: (req,res)=> {
        const idUser = req.params.id_user
        categoryModel.categoryDetail(idUser)
        .then((result)=> {
            helpers.response(res,result,200);
        })
        .catch((err)=> {
            helpers.response(res,result,403,err)
        })
    }
}