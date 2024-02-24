const{Post,validatePost} = require('../../models/Post')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage } = require('../../utils/cloudianary')

/**----------------------------------------------------
 * @description Create new  Post  .
 * @router /api/post/
 * @method POST
 * @access Private (only logged user)
 ------------------------------------------------------*/
const createPost = async (req,res) => {
    console.log(req.file)
    console.log(req.body)
    console.log(req.user)
     //1. validate for image 
     if(!req.file){
        return res.status(400).json({message:"No image provided"})
    }

     //2. validate for data post
     const {error} = validatePost(req.body)
     if(error){
         return res.status(400).json({message:error.details[0].message})
     }

    //3. upload image
    const imagePath = path.join(__dirname,`../../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath)

   //4. create new post and save it to db
   const newPost = await Post.create({ 
        title: req.body.title,
        description: req.body.description, 
        category: req.body.category, 
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }, 
    });

    if(!newPost){
        return res.status(400).json({message:'No create a new post try again'}) 
    }
    //5. send client post
    res.status(201).json({message:'create success',data:newPost});

    //6. delete image in the folder
    fs.unlinkSync(imagePath)
    // try {
    //     console.log('le result est : ',result)

        
    //     if (!result || !result.secure_url || !result.public_id) {
    //         return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    //     }

    //     // Correction : Utiliser await pour attendre que la promesse se résolve
      
    // } catch (error) {
    //     // Gérer une éventuelle erreur lors de la création du post
    //     console.error("Erreur lors de la création du post :", error);
    //     res.status(500).json({ message: "Erreur interne du serveur" });
    // } finally {
    //     // Supprimer toujours le fichier image après le traitement
    // }
}

/**----------------------------------------------------
 * @description get all  Post  .
 * @router /api/post/
 * @method GET
 * @access Public
 ------------------------------------------------------*/
const getAllPostCtrl = async (req,res) => {
    const POST_PER_PAGE = 3;
    const {pageNumber, category} = req.query
    let posts;
    if(pageNumber){
        posts = await Post.find()
            .skip((pageNumber-1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
    } else if(category){
        posts = await Post.find({category})
    }
    else{
        posts = await Post.find()
    }
    res.status(200).json(posts)
}

module.exports = {createPost,getAllPostCtrl}