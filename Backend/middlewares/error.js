//Error sur url not found
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalURL}`)
    req.status(404)
    next(error)
}


//Error dans la partie backend
const errorHandle = async(err,req,res,next) => {
    const statusCode = res.status=== 200 ? 500 : res.status
    res.status(statusCode).json({
        message:err.message,
        stack : process.env.NODE_ENV === "Production" ? null : err.stack
    })
}


module.exports = {errorHandle}