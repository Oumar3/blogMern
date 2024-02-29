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
        return res.status(400).json({message:'Access not denied, connect in admin compte'})
     }
     const comments = await Comment.find().populate('user',["-password"])
     res.status(200).json(comments)
 }

 /**----------------------------------------------------
 * @description delete   comment  .
 * @router /api/comment/id
 * @method Delete
 * @access Private (only user logged || admin)
 ------------------------------------------------------*/

 const deleteAllCommentCtrl = async (req,res) => {
    const comment = await Comment.findById(req.params.id)
    if(!comment){
       return res.status(400).json({message:'comment not found'})
    }
    if(req.user.isAdmin || req.user.id === comment.user._id.toString()){
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'deleted successful...'})
    }else{
        res.status(400).json({message:'Access not denied, logged in compte || in admin'})
    }
}

 /**----------------------------------------------------
 * @description update   comment  .
 * @router /api/comment/id
 * @method put
 * @access Private (only user logged)
 ------------------------------------------------------*/

 const commentUpdateCtr = async (req,res)=> {

    const {error} = validateUpdateComment(req.body)

    if(error){
        return res.status(400).json({message:error})
    }

    const comment = await Comment.findById(req.params.id)
    if(!comment){
        return res.status(400).json({message:'comment not found'})
    }

    if(req.user.id !== comment.user.toString()){
        return res.status(400).json({message:'Access not denied, logged in compte'})
    }

    const update = await Comment.findByIdAndUpdate(req.params.id,{
        $set:{
            text:req.body.text
        }
    },{new:true})

    res.status(200).json(update)
 }

module.exports = {commentCtrl,getAllCommentCtrl,deleteAllCommentCtrl,commentUpdateCtr}