const router = require('express').Router()
const {createPost,getAllPostCtrl,getSinglePostCtrl,getCountPostCtrl,DeletePostCtrl} 
= require('../../controllers/post/postController')
const {verifyToken} = require('../../middlewares/verifyToken')
const {validateData} = require('../../middlewares/validateData')
const {photoUpload} = require('../../middlewares/photoUpload')

 router.route('/')
    .post(verifyToken, photoUpload.single('image'), createPost)
    .get(getAllPostCtrl)

router.route('/count')
    .get(getCountPostCtrl)

router.route('/:id')
    .get(getSinglePostCtrl)
    .delete(validateData,verifyToken,DeletePostCtrl)


// router.get('/', getAllPostCtrl)
// router.post('/', photoUpload.single('image'), createPost)


module.exports = router;