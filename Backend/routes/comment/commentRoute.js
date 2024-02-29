const { commentCtrl,getAllCommentCtrl,deleteAllCommentCtrl,commentUpdateCtr } = require('../../controllers/comment/commentController')
const { verifyToken } = require('../../middlewares/verifyToken')
const {validateData}= require('../../middlewares/validateData')
const router = require('express').Router()

router.route('/')
    .post(verifyToken,commentCtrl)
    .get(verifyToken,getAllCommentCtrl)

router.route('/:id')
    .delete(validateData,verifyToken,deleteAllCommentCtrl)
    .put(validateData,verifyToken,commentUpdateCtr)
    
module.exports = router
