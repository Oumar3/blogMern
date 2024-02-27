const { commentCtrl,getAllCommentCtrl } = require('../../controllers/comment/commentController')
const { verifyToken } = require('../../middlewares/verifyToken')
const router = require('express').Router()

router.route('/')
    .post(verifyToken,commentCtrl)
    .post(getAllCommentCtrl)

module.exports = router
