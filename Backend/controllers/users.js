const {User} = require('../models/User')
const {validateUpdateUser} = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')
const { cloudinaryUploadImage,cloudinaryRemoveImage,cloudinaryRemoveMultiplImage} = require('../utils/cloudianary')
const { Comment } = require('../models/Comment')
const { Post } = require('../models/Post')
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
        const user = await User.findById(id).select('-password').populate('posts')  
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
    // get user
    const user = await User.findById(req.user.id)
    //delete old photo profile if exist
    if(user.profilePhoto.publicId!==null){
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }
    // change photo profile
    user.profilePhoto={
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save()
    //send response client
    res.status(200).json({message:'Your photo profile upload successful...'})
    //remove du dossier images
    fs.unlinkSync(imagePath)
 }


/**----------------------------------------------------
 * @description delete  user  .
 * @router /api/user/profile/id
 * @method GET
 * @access Private (only admin)
 ------------------------------------------------------*/
 const DeleteUser = async (req,res)=>{
    const {id} = req.params
    try {
        const user = User.findById(id)
        console.log(user.isAdmin)
        if(!user.isAdmin){
            return res.status(403).json({message:'Access no denied'})
        }
        if(!user){
            return res.status(403).json({message:'user not found'})
        }

        const posts = await Post.find({user: user._id})

        const publicId = posts?.map(post=>post.image.publicId)
        
        if(publicId?.length>0){
            cloudinaryRemoveMultiplImage(publicId)
        }

        await cloudinaryRemoveImage(user.profilePhoto.publicId)
        await Comment.deleteMany({user: user._id})
        await Post.deleteMany({user: user._id})

        await User.findOneAndDelete(id)
    } catch (error) {
        console.log(error.message)
    }
    res.status(200).json({message:"user has been deleted !"})
 }

module.exports = {getAllUser,getSingleUser,UpdateUser,photoUploadctrl,DeleteUser}