
const express = require("express")
const { createPosts, getposts, updatePost,deletePost,likePost, getpostsBySearch} = require("../controller/postController")
const   auth  = require("../Middleware/auth")



const postRoutes = express.Router()


postRoutes.post("/",auth,createPosts)
postRoutes.get("/search",getpostsBySearch)
postRoutes.get("/",getposts)
postRoutes.patch("/:id",auth,updatePost)
postRoutes.delete("/:id",auth,deletePost)
postRoutes.patch("/:id/likePost",auth,likePost)

module.exports = postRoutes