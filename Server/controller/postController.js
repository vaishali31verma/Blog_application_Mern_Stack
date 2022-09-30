
const { default: mongoose } = require("mongoose")
const postMessage = require("../Models/posts")



 const getposts=async(req,res)=>{
  const { page } = req.query;
    console.log(page)
  try {
      const LIMIT = 4;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  
      const total = await postMessage.countDocuments({});
      const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
     
      res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
   
}





 const createPosts=async(req,res)=>{
    const posts = req.body
    const post = new postMessage({...posts,creator:req.userId,createdAt: new Date().toISOString()})
  try{
        await post.save()
        res.status(200).json(post)
  }catch(e){
    res.status(400).json(e.message)
  }
}

const updatePost = async(req,res)=>{
  const { id } = req.params;
    const { title, message, creator, SelectedFiles, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, SelectedFiles, _id: id };

    await  postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async(req,res)=>{
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)
  await  postMessage.findByIdAndDelete(id);
  res.json({message:"post deleted successfully"})
}

const likePost = async(req,res)=>{
  const { id } = req.params
  if(!req.userId) return res.json({message:"usauthenticated"})
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)
 const post = await  postMessage.findById(id)
 
 const index = post.likes.findIndex((id)=>id===String(req.userId));
 console.log(index)
 if(index===-1){
  //like the post
 
  post.likes.push(req.userId)
 }else{
  //dislike the post
  console.log(index)
  post.likes = post.likes.filter((id)=>id!==String(req.userId))
  
 }

 const updatedPost= await  postMessage.findByIdAndUpdate(id,post,{new:true})
 res.status(200).json(updatedPost);

}

const getpostsBySearch =async(req,res)=>{
  const {searchQuery,tags} = req.query
 
  try{
     
    const title = new RegExp(searchQuery,"i")
    const posts = await postMessage.find({ $or: [ { title:title }, { tags: { $in: tags.split(',') } } ]});
    console.log(posts)
     res.json({data:posts})
    
   }catch(err){
    res.status(404).json({message:err.message})

   }
}





module.exports = {getposts,createPosts,updatePost,deletePost,likePost,getpostsBySearch}