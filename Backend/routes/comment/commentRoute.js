const { commentCtrl,getAllCommentCtrl,deleteAllCommentCtrl } = require('../../controllers/comment/commentController')
const { verifyToken } = require('../../middlewares/verifyToken')
const {validateData}= require('../../middlewares/validateData')
const router = require('express').Router()

router.route('/')
    .post(verifyToken,commentCtrl)
    .get(verifyToken,getAllCommentCtrl)

router.route('/:id')
    .delete(validateData,verifyToken,deleteAllCommentCtrl)
    
module.exports = router
