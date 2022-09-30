import React from 'react'
import {Container,AppBar,Typography,Grow,Grid, Paper, TextField, Button} from "@material-ui/core"
import { useHistory, useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import {useDispatch,useSelector} from "react-redux"
import {useEffect, useState} from "react"

import Posts from '../Posts/Post'
import Form from "../Form/Form"
import { getPosts, getPostsBySearch } from '../../action/postaction'
import Paginate from '../Pagination'
import useStyles from './styles';

function useQuery(){
  return new URLSearchParams(useLocation().search)
}





const Home = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [tags,setTag] = useState([])
  const [currentId,setCurrentId] = useState(0)
  const data = useSelector((state)=>state.posts)
  const query = useQuery()
  const history = useNavigate()
  const page =query.get("page") || 1
  const searchQuery = query.get("searchQuery")
 
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }



 useEffect(()=>{
   dispatch(getPosts())
 },[currentId,dispatch])

 const handleAddChip = (tag) =>{
  console.log(tag)
  setTag([...tags,tag])
};

 
 const handleDeleteChip = (tagtoDelete) =>setTag(tags.filter((tag)=>tag!==tagtoDelete));
 
 const searchPost = () => {
  if (search.trim() || tags) {
    
    dispatch(getPostsBySearch({search,tags:tags.join(',')}));
    history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
  } else {
    history('/')
  }
};







 const handleKeyPress =(e)=>{
  if(e.KeyCode ===13){
    //seraceh
    searchPost()
  }
 }
  
  return (
    <Grow in>
        <Container maxWidth="xl" >
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={7} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
                <ChipInput
               style={{ margin: '10px 0' }}
               value={tags}
               onAdd={(chip) => handleAddChip(chip)}
               onDelete={(chip) => handleDeleteChip(chip)}
               label="Search Tags"
               variant="outlined"
              />
               <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId ={currentId} setCurrentId={setCurrentId}/>
              <Paper elevation={6}>
              {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home