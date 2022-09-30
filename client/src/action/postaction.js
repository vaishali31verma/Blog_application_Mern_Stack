import * as api from "../api";
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, UPDATE } from "../consts/actiontypes";
//Action Createros 


export const getPosts =(page)=>async(dispatch)=>{

  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
   
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }

    
    
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
  
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};






export const createPosts =(post)=>async(dispatch)=>{
    try{
      const {data} = await api.createPost(post)
      dispatch({type:CREATE,payload:data})
    }catch(e){
        console.log(e.message)
    }
}

export const updatePosts=(id,post)=>async(dispatch)=>{

  try{
      const {data}= await api.updatePost(id,post)
      dispatch({type:UPDATE,payload:data})
  }catch(e){
    console.log(e.message)
  }
}


export const deletePost =(id)=>async(dispatch)=>{
  try{
    await api.deletePosts(id)
    dispatch({type:DELETE,payload:id})
  }catch(e){
    console.log(e.message)
  }
}


export const LikePosts =(id)=>async(dispatch)=>{
   try{
      const {data}= await api.LikePosts(id)
       dispatch({type:LIKE,payload:data})


   }catch(e){
         console.log(e)
   }
}