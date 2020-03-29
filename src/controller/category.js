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
    },
    insertCategory: (req,res)=> {
        const {name_category} = req.body
        const data = {name_category}
        categoryModel.insertCategory(data)
        .then((result)=> {
            helpers.response(res,result,200)
        })
        .catch((err)=> {
            helpers.response(res,result,403,err)
        })
    },
    updateCategory: (req,res)=> {
        const idCategory = req.params.id_category
        const {name_category} = req.body
        const data = {name_category}
        categoryModel.updateCategory(idCategory,data)
        .then((resultCategory)=> {
            const result = resultCategory
            helpers.response(res,result,200,[idCategory,data])
        })
        .catch((err)=> {
            helpers.response(res,result,404,err)
        })
    }
}