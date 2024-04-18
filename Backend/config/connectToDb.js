const mongoose = require('mongoose')

const connexion = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected succefull !!!")

    } catch (error) {
        console.log('erreur de connection',error.message)
    }
}

module.exports=connexion;