const mongoose = require('mongoose')

//verifie si id est valide ou non
const validateData =  async (req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({message:'Id is not valide'})
    }
    next()
}

module.exports = {validateData}