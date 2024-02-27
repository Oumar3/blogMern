const router = require('express').Router()
const {createPost,toggleLikeCtrl,getAllPostCtrl,getSinglePostCtrl,getCountPostCtrl,DeletePostCtrl,UpdatePostCtrl,UpdateImagePostCtrl} 
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
    .put(validateData,verifyToken,UpdatePostCtrl)

router.route('/upload-image/:id')
    .put(validateData,verifyToken,photoUpload.single('image'),UpdateImagePostCtrl)

router.route('/like/:id')
    .put(validateData,verifyToken,toggleLikeCtrl)

// router.get('/', getAllPostCtrl)
// router.post('/', photoUpload.single('image'), createPost)


module.exports = router;