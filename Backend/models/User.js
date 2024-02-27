const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
// Validation de attributs de coté Db
    {
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:11,
        maxlength:100,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        maxlength:100,
    },
    profilePhoto:{
        type:Object,
        default:{
            url:"https://media.istockphoto.com/id/1645956279/fr/vectoriel/ic%C3%B4ne-web-de-signe-de-profil-utilisateur-avec-glyphe-de-coche-illustration-vectorielle.jpg?s=612x612&w=0&k=20&c=-mlSNXhYX3Ic5hUC8BJTi1nxMss91UNDPZ4IFAZ0DfI=",
            publicId:null
        }
    },
    bio:{
        type:String,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


UserSchema.virtual('posts',{
    ref: 'Post',
    foreignField: 'user',
    localField: '_id'
})

//Generate token
// const generateAuthenToken = () => {
//     return 
// }

const User = mongoose.model('User',UserSchema)

// Validation de attributs de coté express
const validateRegisterUser = (obj) => {
    const schema = Joi.object({
        username:Joi.string().trim().min(3).max(100).required(),
        email:Joi.string().trim().min(11).max(100).required(),
        password:Joi.string().trim().min(4).required()
    })
}

const validateLoginUser = (obj) => {
    const schema = Joi.object({
        email:Joi.string().trim().min(11).max(100).required(),
        password:Joi.string().trim().min(4).required()
    })
}

const validateUpdateUser = (obj) => {
    const schema = Joi.object({
        username:Joi.string().trim().min(11).max(100),
        password:Joi.string().trim().min(4),
        bio:Joi.string().trim()
    })
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
}