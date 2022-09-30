
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const morgan =  require('morgan')
const userrouter =  require('./routers/userRouters')
const postRoutes = require("./routers/PostsRoutes")



const app =express()

app.use(morgan("dev"))
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/posts",postRoutes)
app.use("/user",userrouter)
app.get("/",(req,res)=>{
  res.send("jwioefj")
})
require('dotenv').config()









// app.get("/",(req, res, next)=>{
//     res.send("hello express")
// })


// const MONgooseconnection=()=>{
//     try{
//         mongoose.connect(MONGO_URl,()=>{
//             console.log("mongoose conecctions")
//         })
//     }catch(e){
//         console.log(e.message)
//     }
    
// }

// app.listen(PORT,()=>{
//     MONgooseconnection()
//     console.log("serever running on port 5000")
// })


mongoose.connect(process.env.MONGO_URl)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))