import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/Post'
   import useStyles from "./styles"
const Posts = ({setCurrentId}) => {
    const classes = useStyles()
    const {posts} = useSelector((state)=>state.posts)

     console.log(posts)
     if (!posts?.length ) return 'No posts'
  return (
 

    <>
     {!posts?.length?<CircularProgress />:<Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((e)=>(
          <Grid key={e._id} item xs={12} sm={6}>
            <Post post={e} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>}
    </>
  )
}

export default Posts