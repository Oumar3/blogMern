const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next)=>{
    const authoToken = req.headers.authorization
    if(authoToken){
        const token = await authoToken.split(" ")[1]
        // console.log(token)
        try {
            const decodedPayload = await jwt.verify(token,process.env.SECRET_KEY)
            req.user = decodedPayload
            next()
        } catch (error) {
            return res.status(401).json({message:'Token invalid, Access not denied'})
        }
    }else{
        return res.status(401).json({message:'Token not provided, Access denied.'})
    }
}

const verifyTokenOnlyUser = async (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            next()
        }else{
            return res.status(401).json({message:'Token not provided, only user.'})
    
        }
    })
   
}

const verifyTokenAndAuthorization= async (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).json({message:'Token not provided, only user.'})
    
        }
    })
   
}

module.exports = {verifyToken,verifyTokenOnlyUser,verifyTokenAndAuthorization}