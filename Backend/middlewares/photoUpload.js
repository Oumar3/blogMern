const multer = require('multer')
const path = require('path')


// Configurer le stockage avec Multer
 const photoStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname,'../images'))// Créez un dossier "uploads" à la racine de votre projet
    },

    filename: function (req,file,cb){
        if(file){
            cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname)
        }else{
            cb(null,false)
        }
    }
})

//midellwar
const photoUpload = multer({
    storage: photoStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb({message:'image unsupportable'},false)
        }
    },
    limits:{filesize:1024*1024}
})

module.exports = {photoUpload}