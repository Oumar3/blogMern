const router = require('express').Router()
const {createPost,getAllPostCtrl,getSinglePostCtrl,getCountPostCtrl} = require('../../controllers/post/postController')
const {verifyToken} = require('../../middlewares/verifyToken')
const {photoUpload} = require('../../middlewares/photoUpload')

 router.route('/')
    .post(verifyToken, photoUpload.single('image'), createPost)
    .get(getAllPostCtrl)

router.route('/count')
    .get(getCountPostCtrl)

router.route('/:id')
    .get(getSinglePostCtrl)


// router.get('/', getAllPostCtrl)
// router.post('/', photoUpload.single('image'), createPost)


module.exports = router;