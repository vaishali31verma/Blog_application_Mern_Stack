const mongoose = require('mongoose')

const postSchema =new mongoose.Schema({
    title:String,
    message:{ type: String},
    creator:{ type: String},
    tags:[String],
    name:String,
    SelectedFiles:String,
    likes:{ type:[String],default:[]},
    created_At:{type:Date,default:new Date()}
})


const postMessage = mongoose.model("PostMessage",postSchema)

module.exports = postMessage