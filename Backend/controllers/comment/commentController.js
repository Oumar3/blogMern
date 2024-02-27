const {Comment,validateCreateComment,validateUpdateComment} = require('../../models/Comment')
const { User } = require('../../models/User')
/**----------------------------------------------------
 * @description create  comment  .
 * @router /api/comment
 * @method Post
 * @access Private (only logged user)
 ------------------------------------------------------*/


 const commentCtrl = async (req,res)=>{
   
    //1.validation
    const  { error }  =  validateCreateComment(req.body)

    if(error){
        return res.status(200).json({message:error.message})
    }

    //2.Profile logged
    const profile = await User.findById(req.user.id)
   
    const comment = await Comment.create({
        postId: req.body.postId,
        user:   req.user.id,
        text:   req.body.text,
        username: profile.username,
    })
    res.status(201).json(comment)
 }


 /**----------------------------------------------------
 * @description get all  comment  .
 * @router /api/comment
 * @method Get
 * @access Private (only admin)
 ------------------------------------------------------*/

 const getAllCommentCtrl = async (req,res) => {
     if(!req.user.isAdmin){
        return res.status(400).json({message:'Access not denied'})
     }
     const comments = await Comment.find().select('-password').populate('user')
     res.status(200).json(comments)
 }

 module.exports = {commentCtrl,getAllCommentCtrl}