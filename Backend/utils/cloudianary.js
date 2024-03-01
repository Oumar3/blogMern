const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//cloudinary Upload image
const cloudinaryUploadImage = async (fileToUpload) =>{
    try {
        const data = await cloudinary.uploader.upload(fileToUpload,{
            resource_type: 'auto'
        })
        return data
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Cloudinary upload failed');
    }
}

//cloudinary Remove image
const cloudinaryRemoveImage = async (imagePublicId) =>{
    try {
        const resule = await cloudinary.uploader.destroy(imagePublicId)
        return resule
    } catch (error) {
        return error
    }
}

//cloudinary Remove cloudinaryRemoveMultiplImage
const cloudinaryRemoveMultiplImage = async (imagePublicIds) =>{
    try {
        const resule = await cloudinary.v2.api.delete_ressources(imagePublicIds)
        return resule
    } catch (error) {
        return error
    }
}

module.exports = { cloudinaryUploadImage,cloudinaryRemoveImage,cloudinaryRemoveMultiplImage}
