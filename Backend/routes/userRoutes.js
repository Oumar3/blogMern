const router = require('express').Router()
const {getAllUser,getSingleUser,UpdateUser,DeleteUser} = require('../controllers/users')
const { verifyToken,verifyTokenOnlyUser,verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
const {validateData} = require('../middlewares/validateData') 

router.get('/profiles',verifyToken,getAllUser)
router.get('/profiles/:id',validateData,getSingleUser)
router.put('/profiles/:id',validateData,verifyTokenOnlyUser,UpdateUser)
router.delete('/profiles/:id',validateData,verifyTokenAndAuthorization,DeleteUser)


module.exports = router
