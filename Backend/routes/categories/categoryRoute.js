const { categoryCreateCtrl,getAllCategoriesCtrl,deleteCategoriesCtrl } = require('../../controllers/category/categoriesController')
const { verifyToken } = require('../../middlewares/verifyToken')
const {validateData}= require('../../middlewares/validateData')
const router = require('express').Router()


router.route('/')
    .post(verifyToken,categoryCreateCtrl)
    .get(getAllCategoriesCtrl)

router.route('/:id')
    .delete(verifyToken,validateData,deleteCategoriesCtrl)


module.exports = router