const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type: String,
        required:true,
        trim:true
    },

},{timestamps:true})

const Category = mongoose.model('category',CategorySchema)

const validateCreateCategory = (obj)=>{
    const schema = Joi.object({
        title: Joi.string().trim().required().label('Title'),
    })
    return schema.validate(obj)
}

const validateUpdateCategory= (obj)=>{
    const schema = Joi.object({
        text: Joi.string().trim()
    })
    return schema.validate(obj)
}

module.exports={Category,validateCreateCategory,validateUpdateCategory}