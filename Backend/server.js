
const express = require('express')
const app = express()
require('dotenv').config()

//import les fonctions
const connect_db = require('./config/connectToDb')

//les Middlewares 

app.use((req,res,next)=>{
    console.log(req.method)
    next()
})

app.use(express.json())

app.use('/api/auth',require('./routes/userAuths'))
app.use('/api/users',require('./routes/userRoutes'))


//End Middlewares 


// la Methode get pour m'afficher hello world sur mon navigateur(client)
app.get('/',(req,res)=>{
    res.send("Hello")
})

// La connexion à la base de donnée et le lancement dur server sur le port 8000
const PORT=process.env.PORT

app.listen(PORT,()=>{
    try {
        connect_db()
        console.log("Server Up !")
    } catch (error) {
        console.log("Erreur est survenue...",error.message)
    }
})