import React, { useEffect, useState } from 'react'
import memories from "../../Images/memories.png"
import {Container,AppBar,Typography,Grow,Grid, Toolbar, Avatar, Button} from "@material-ui/core"
import useStyles from "./styles"
import {Link, useNavigate,useLocation} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../consts/actiontypes'
import decode from "jwt-decode"

const Navbar = () => {
    const classes = useStyles()
    const [user,setuser] = useState(JSON.parse(localStorage.getItem("profile")))
    const dispatch = useDispatch()
    const location = useLocation()
   const navigate = useNavigate()
    const logout =()=>{
        dispatch({type:LOGOUT})
        navigate("/")
        setuser(null)
    }
    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setuser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
  


  return (
    <AppBar  position="static" color="inherit" className={classes.appBar}>
        <div className={classes.brandContainer}>
    <Typography  variant="h2" align="center" className={classes.heading} component={Link} to="/">Memories</Typography>
    <img className={classes.image} src={memories} alt="icon" height="60" />
    </div>
    <Toolbar className={classes.toolbar}>
       {user?
           <div className={classes.profile}>
            <Avatar className={classes.avatar}   alt ={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant ="h5">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
           </div>
       :
           <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
       }
    </Toolbar>
  </AppBar>
  )
}

export default Navbar