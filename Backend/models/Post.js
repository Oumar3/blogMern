const mongoose = require('mongoose')
const Joi = require('joi')
const Schema =new mongoose.Schema()

const PostSchema = Schema({
        title: {
            type: String,
            require: true,
            trime: true,
            minlength: 5,
            maxlength: 100,
        },
        descrption: {
            type: String,
            require: true, 
            trime: true,
            minlength: 15,
        },
        // relation avec user disont foreign key
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        category: {
            type: String,
            require:true,
        },
        image:{
            type: Object,
            default: {
                url:"",
                publicId: null
            }  
        },
        likes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps:true
    }
)


const Post = mongoose.model('Post',PostSchema)

//Validate create post
const validatePost = (obj)=>{
    const schema = Joi.Object({
        title:Joi.string().trim().min(5).max(100).required(),
        descrption:Joi.string().trim().min(15).required(),
        category:Joi.string().trim().required()
    })
    return schema.validate(obj)
}

//Validate update post
const validateUpdatePost = (obj)=>{
    const schema = Joi.Object({
        title:Joi.string().trim().min(5).max(100),
        descrption:Joi.string().trim().min(15),
        category:Joi.string().trim()
    })
    return schema.validate(obj)
}


module.exports = {Post,validatePost,validateUpdatePost}