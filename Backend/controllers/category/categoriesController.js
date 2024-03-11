const {Category,validateCreateCategory,validateUpdateCategory} = require('../../models/Category')
const { User } = require('../../models/User')

/**----------------------------------------------------
 * @description create  category  .
 * @router /api/categories
 * @method Post
 * @access Private (only admin)
 ------------------------------------------------------*/

 const categoryCreateCtrl = async (req,res) =>{
    //1. validation data
    const {error} = validateCreateCategory(req.body)

    if(error){
        return res.status(403).json({message:error.message})
    }

    //2.Verify admin connected
    if(!req.user.isAdmin){
        return res.status(403).json({message:'Access no denied only admin create category'})
    }

    const category = await Category.create({
        user: req.user.id,
        title: req.body.title
    })

    res.status(201).json(category)
 }

 /**----------------------------------------------------
 * @description get all  category  .
 * @router /api/categories
 * @method get
 * @access Public
 ------------------------------------------------------*/
const getAllCategoriesCtrl = async (req,res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
}

/**----------------------------------------------------
 * @description delete  category  .
 * @router /api/categories/id
 * @method delete
 * @access Private (only admin)
 ------------------------------------------------------*/
 const deleteCategoriesCtrl = async (req,res) => {
    const {id} = req.params
    const category = await Category.findById(id)

    if(!category){
        return res.status(403).json({message:'Category not found'})
    }

    if(!req.user.isAdmin){
        return res.status(403).json({message:'Access no denied'})  
    }
    
   const cate = await Category.findByIdAndDelete(id)
   res.status(200).json({message:'Category has been deleted successfully',categoryId:category._id})
}

 module.exports = {categoryCreateCtrl,getAllCategoriesCtrl,deleteCategoriesCtrl}
    