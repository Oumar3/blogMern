const router = require('express').Router()
const {getAllUser,getSingleUser,UpdateUser,photoUploadctrl,DeleteUser} = require('../controllers/users')
const { verifyToken,verifyTokenOnlyUser,verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
const {validateData} = require('../middlewares/validateData') 
const {photoUpload} = require('../middlewares/photoUpload')

router.get('/profiles',verifyToken,getAllUser)
router.post('/profile/photo-upload',verifyToken,photoUpload.single('image'),photoUploadctrl)
router.get('/profiles/:id',validateData,getSingleUser)
router.put('/profiles/:id',validateData,verifyTokenOnlyUser,UpdateUser)
router.delete('/profiles/:id',validateData,verifyTokenAndAuthorization,DeleteUser)


module.exports = router
