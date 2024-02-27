const{Post,validatePost, validateUpdatePost} = require('../../models/Post')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage,cloudinaryRemoveImage } = require('../../utils/cloudianary')
const {validateData} = require('../../middlewares/validateData')

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
            .populate('user',['-password'])
    } else if(category){
        posts = await Post.find({category})
            .populate('user',['-password'])
    }
    else{
        posts = await Post.find().sort({ createdAt: -1 } )
            .populate('user',['-password'])
    }
    res.status(200).json(posts)
}


/**----------------------------------------------------
 * @description get single  Post  .
 * @router /api/post/id
 * @method GET
 * @access Public
 ------------------------------------------------------*/
 const getSinglePostCtrl = async (req,res) => {

    const post = await Post.findById(req.params.id).populate('user',['-password'])
    if(!post){
        return res.status(400).json({message:'post not found'})
    }

    res.status(200).json(post)
}

/**----------------------------------------------------
 * @description count Post  .
 * @router /api/post/count
 * @method GET
 * @access Admin
 ------------------------------------------------------*/
 const getCountPostCtrl = async (req,res) => {

    const post = await Post.find().count()
    if(!post){
        return res.status(400).json({message:'post not found'})
    }

    res.status(200).json(post)
}

/**----------------------------------------------------
 * @description delete  Post  .
 * @router /api/post/id
 * @method delete
 * @access (logged user or admin)
 ------------------------------------------------------*/
 const DeletePostCtrl = async (req,res) => {
    const { id } = req.params

    const post = await Post.findById(id)

    console.log(post)

    if(!post){
        return res.status(400).json({message:'post not found'})
    }

    if(req.user.isAdmin || req.user.id === post.user.toString()){
        await Post.findByIdAndDelete(id) 
        await cloudinaryRemoveImage(post.image.publicId)
    }
    else{
        return res.status(400).json({message:'Access no denied forbiden'})
    }

    res.status(200).json({message:'delete successful',postId:post._id})
}

/**----------------------------------------------------
 * @description update  Post.
 * @router /api/post/id
 * @method put
 * @access (logged user)
 ------------------------------------------------------*/

const UpdatePostCtrl = async (req,res)=>{

    //1.Validation data
    const {error} = validateUpdatePost(req.body)
    if(error){
        return res.status(400).json({message:error.message})
    }

    //2.get post by id and check post exist
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(400).json({message:'post not found for update'})
    }
    
    //3.verify user is logged
    if(req.user.id !== post.user.toString()){
        return res.status(400).json({message:'user no logged access no dinied'})
    }

    // const imagePath =  path.join(__dirname,`../../images/${req.file.filename}`)
    // let result = await cloudinaryUploadImage(imagePath)

    const updatePost = await Post.findByIdAndUpdate(req.params.id,
        {
            $set:
            {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
            }
        },
        {
            new:true
        }
        ).populate("user",["-password"])

res.status(200).json(updatePost)
}



/**----------------------------------------------------
 * @description update image Post.
 * @router /api/image/id
 * @method put
 * @access (l'auteur)
 ------------------------------------------------------*/

 const UpdateImagePostCtrl = async (req,res)=>{

    //1.Validation data
    if(!req.file){
        return res.status(400).json({message:'image no provided'})
    }

    //2.get post by id and check post exist
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(400).json({message:'post not found for update'})
    }
    
    //3.verify user is logged
    if(req.user.id !== post.user.toString()){
        return res.status(400).json({message:'user no logged access no dinied'})
    }

    //4.Delete image
    await cloudinaryRemoveImage(post.image.publicId)
    //.5 upload image
    const imagePath = path.join(__dirname,`../../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath)

    const updatePost = await Post.findByIdAndUpdate(req.params.id,
        {
            $set:
            {
                image: {
                    url: result.secure_url,
                    publicId: result.public_id
                },
            }
        },
        {
            new:true
        }
        )
res.status(200).json(updatePost)
}

/**----------------------------------------------------
 * @description Toggle like.
 * @router /api/post/like/id
 * @method put
 * @access (only logged in user)
 ------------------------------------------------------*/

 const toggleLikeCtrl = async (req,res) => {
    const loggedinUser = req.user.id
    const { id: postId } = req.params
    let post = await Post.findById(postId)
    if(!post){ 
        return res.status(404).json({message:'post not found'})
    }
    const isPostAlreadyLiked = post.likes.find(user=>user.toString() === loggedinUser)

   if(isPostAlreadyLiked){
        post = await Post.findByIdAndUpdate(postId,{
            $pull: {
                likes: loggedinUser
            }
        })
   }else{
        post = await Post.findByIdAndUpdate(postId,{
            $push: {
                likes: loggedinUser
            }
        })
   }
   res.status(200).json(post)
 }



module.exports = {
    createPost,getAllPostCtrl,
    getSinglePostCtrl,getCountPostCtrl,
    DeletePostCtrl,UpdatePostCtrl,
    UpdateImagePostCtrl,
    toggleLikeCtrl,
}