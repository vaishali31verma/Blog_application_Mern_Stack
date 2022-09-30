import { CREATE, DELETE, FETCH_ALL,  FETCH_BY_SEARCH,  LIKE,  UPDATE } from "../consts/actiontypes"


 const posts =(state=[],{type,payload})=>{
    
 
  switch (type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: payload.data,
        currentPage: payload.currentPage,
        numberOfPages: payload.numberOfPages,
      }
    
    case CREATE :
        return [...state,payload]
  
    case UPDATE:
   
    return state.map((post)=>post._id===payload._id?payload:post) 
    
     case  DELETE: return state.filter((post)=>post._id!==payload)
    
     case FETCH_BY_SEARCH:
     return { ...state, posts: payload.data };
    // case FETCH_POST:
    //   return { ...state, post: action.payload.post };
    case LIKE :
      return { ...state, posts: state.posts.map((post) => (post._id === payload._id ? payload : post)) };
    


    default:
      return state
  }
}

export default posts