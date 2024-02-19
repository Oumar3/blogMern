const{Post,validatePost,validateUpdatePost} = require('../../models/Post')


/**----------------------------------------------------
 * @description Create new  Post  .
 * @router /api/post/
 * @method POST
 * @access Private (only logged user)
 ------------------------------------------------------*/
const createPost = async (req,res) => {
    const {title,descrption,category,image} = req.body
    try {
        
        const error = validatePost(req.body)
        if(error){
            return res.status(403).json({message:error.details[0].message})
        }

        const newPost = new Post({title,descrption,category,image})
        await newPost
        
        res.status(201).json(newPost)
    } 
    catch (error) {
        console.log(error.message)
    }
}