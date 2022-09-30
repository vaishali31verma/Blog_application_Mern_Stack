const express = require("express")

const {signup, signin} = require("../controller/userController")

const userrouter = express.Router()

 userrouter.post("/signup",signup)
 userrouter.post("/signin",signin)
module.exports = userrouter

