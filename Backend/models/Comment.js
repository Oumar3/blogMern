const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    text:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    }
},{timestamps:true})

const Comment = mongoose.model('comment',CommentSchema)

const validateCreateComment = (obj)=>{
    const schema = Joi.object({
        postId: Joi.string().trim().required().label('Post Id'),
        text: Joi.string().trim().required().label('Text'),
    })
    return schema.validate(obj)
}

const validateUpdateComment= (obj)=>{
    const schema = Joi.object({
        text: Joi.string().trim()
    })
    return schema.validate(obj)
}

module.exports={Comment,validateCreateComment,validateUpdateComment}