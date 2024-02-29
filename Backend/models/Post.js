const mongoose = require('mongoose')
const Joi = require('joi');
const Schema = mongoose.Schema

const PostSchema = new Schema({
        title: {
            type: String,
            require: true,
            trime: true,
            minlength: 5,
            maxlength: 100,
        },
        description: {
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
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)

//afficher tout les commentaire lié a cette post
PostSchema.virtual('comments',{
    ref:'Comment',
    foreignField:'postId',
    localField:'_id'
})


const Post = mongoose.model('Post',PostSchema)

//Validate create post
const validatePost = (obj) => {
    const schema = Joi.object({
        title:Joi.string().trim().min(5).max(100).required(),
        description:Joi.string().trim().min(15).required(),
        category:Joi.string().trim().required()
    })
    return schema.validate(obj)
}

//Validate update post
const validateUpdatePost = (obj) => {
    const schema = Joi.object({
        title:Joi.string().trim(),
        description:Joi.string().trim().min(15),
        category:Joi.string().trim()
    })
    return schema.validate(obj)
}


module.exports = {Post, validatePost, validateUpdatePost}