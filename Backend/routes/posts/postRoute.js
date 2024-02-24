const router = require('express').Router()
const {createPost,getAllPostCtrl} = require('../../controllers/post/postController')
const {verifyToken} = require('../../middlewares/verifyToken')
const {photoUpload} = require('../../middlewares/photoUpload')

 router.route('/')
    .post(verifyToken, photoUpload.single('image'), createPost)
// router.get('/',getAllPostCtrl)



// router.get('/', getAllPostCtrl)
// router.post('/', photoUpload.single('image'), createPost)


module.exports = router;