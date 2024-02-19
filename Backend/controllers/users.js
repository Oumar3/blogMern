const {User} = require('../models/User')
const {validateUpdateUser} = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require('path')
const { cloudinaryUploadImage,cloudinaryRemoveImage} = require('../utils/cloudianary')
/**----------------------------------------------------
 * @description getAll  user <===> Sign in.
 * @router /api/user/profile
 * @method GET
 * @access Private (only admin)
 ------------------------------------------------------*/
const getAllUser = async (req,res)=>{
    try {
        if(!req.user.isAdmin){
            res.status(403).json({message:'Access not denied'})
        }
        
        const users = await User.find()  

        if(!users || users.length===0){
            res.status(400).json({message:'Not found users'})
        }
        else{
            res.status(200).json(users)
        }
    }
    catch (error) {
        console.log(error.message)
    }
    
}

/**----------------------------------------------------
 * @description getSingle  user  .
 * @router /api/user/profile/id
 * @method GET
 * @access Private (only admin)
 ------------------------------------------------------*/
 const getSingleUser = async (req,res)=>{
    id  = req.params.id
    try {
        // if(!req.user.isAdmin){
        //     res.status(403).json({message:'Access not denied'})
        // }  
        const user = await User.findById(id)  
        // res.status(200).json(user)
        if(!user || user.length===0){
            res.status(400).json({message:'Not found user'})
        }
        else{
            res.status(200).json(user)
        }
      
    }
    catch (error) {
        console.log(error.message)
    }
    
}

/**----------------------------------------------------
 * @description update  user  .
 * @router /api/user/profile/id
 * @method Put
 * @access Private (only himeuserSelf)
 ------------------------------------------------------*/
 const UpdateUser = async (req,res)=>{
    id  = req.params.id
    const {username,password,bio}=req.body
    try {
        // if(!req.user.isAdmin){
        //     res.status(403).json({message:'Access not denied'})
        // }  
        const error = await validateUpdateUser(req.body)
        if(error){
            res.status(400).json({message:'Not found user'})
        }

        if(password){
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password,salt)
        }
    
        const updateUser = await User.findByIdAndUpdate(id,{username,password,bio},{new:true})
        // res.status(200).json(user)
        if(!updateUser || updateUser.length===0){
            res.status(400).json({message:'Not found user'})
        }
        else{
            res.status(200).json(updateUser)
        }
      
    }
    catch (error) {
        console.log(error.message)
    }
    
}
/**----------------------------------------------------
 * @description profile photo  upload.
 * @router /api/profile/photo-upload
 * @method POST
 * @access Private (only Logged user)
 ------------------------------------------------------*/

 const photoUploadctrl = async (req,res) => {
    //verify if req.file contain de data
    if(!req.file){
        return res.status(403).json({message:'No file provided'})
    }

    // get image path
    const imagePath = path.join(__dirname,`../images/${req.file.filename}`)

    // uploade in cloudinary
    const result = await cloudinaryUploadImage(imagePath)
    console.log(result)
    //send response client
    res.status(200).json({message:'Your photo profile upload successful...'})
 }


/**----------------------------------------------------
 * @description getSingle  user  .
 * @router /api/user/profile/id
 * @method GET
 * @access Private (only admin)
 ------------------------------------------------------*/
 const DeleteUser = async (req,res)=>{
    id  = req.params.id
    try {
        const user = User.findById(id)
        console.log(user.isAdmin)
        if(!user.isAdmin){
            return res.status(403).json({message:'Access no denied'})
        }
        if(!user){
            return res.status(403).json({message:'user not found'})
        }
        await User.findOneAndDelete(id) 
    } catch (error) {
        console.log(error.message)
    }
    res.status(200).json({message:"user has been deleted !"})
 }

module.exports = {getAllUser,getSingleUser,UpdateUser,photoUploadctrl,DeleteUser}