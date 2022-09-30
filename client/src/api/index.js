import axios from "axios"
// const url = "http://localhost:8080/posts"

const API = axios.create({baseURL:"https://limitless-escarpment-13111.herokuapp.com/"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})




export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const createPost = (newPost)=>API.post("/posts",newPost)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const updatePost =(id,updateddata)=>API.patch(`/posts/${id}`,updateddata)
export const deletePosts = (id)=>API.delete(`/posts/${id}`)
export const LikePosts = (id)=>API.patch(`/posts/${id}/likePost`)



export const signIn =(formdata)=>API.post("/user/signin",formdata)

export const signUp =(formdata)=>API.post("/user/signup",formdata)