import React, { useState } from 'react'
import { Avatar,Button,Paper,Typography,Container, Grid, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import useStyles from "./style"
import Icon from './icon';
import { AUTH } from '../../consts/actiontypes';
import { useNavigate } from 'react-router-dom';
import { signin,signup } from '../../action/auth';
import { Alert } from '@mui/material';

const Auth = () => {
  const classes = useStyles()
  const [showPassword,setShowpassword] = useState()
  const [formData,setformData] = useState({
    firstName:"",lastName:"",email:"",password:"",confirmPassword:''

  })
  const [isSignup,setisSignup] = useState()
  const dispatch = useDispatch()
  const history = useNavigate()
  // const isSignup = true
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(isSignup){
         dispatch(signup(formData,history))
    }else{
      dispatch(signin(formData,history))
    }
  }
  const handleChange =(e)=>{
    const {name,value} = e.target
    setformData({
     ...formData,
      [name]: value
    })

  }

  const handleShowPassword=()=>setShowpassword((prevshowpass)=>!prevshowpass)

   const switchMode =()=>{ setisSignup((prev)=>!prev) ;handleShowPassword(false)}
   const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
   
    try {
      dispatch({ type: AUTH, data:{result,token} });

      history('/');
      
    } catch (error) {
       Alert("Error")
    }
  };
  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  return (
   <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={2}>
      <Avatar className={classes.avatar} >
       <LockOutlinedIcon />
      </Avatar >
      <Typography variant='h5'>{isSignup?"Sign Up":"Sign In"}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
       <Grid container spacing={2}>
        {isSignup&&(
          <>
          
          <Input name="firstName" label="first Name" handleChange = {handleChange} autoFocus half />
          
         
          <Input name="lastName" label="last Name" handleChange = {handleChange} autoFocus half />
         
          </>
        )}
        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
           {/* {isSignup && <Input name="confirmPassword" label="Repeat password"  handleChange={handleChange} type="password"/>} */}
       </Grid>
       <GoogleLogin
            clientId="67819832160-ep891hc7vqvc8ribdth6jcji1uqq4q26.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
       <Button type="submit" fullWidth variant="contained" color ="primary" className={classes.submit} >{isSignup?"Sign up":"Sign In"}</Button>
       <Grid  container justify='flex-end'>
       <Grid item>
         <Button onClick={switchMode}>
          {isSignup? "Already Have an Account ? Sign In" : "Don't Have an Account ?Sign Up"}

         </Button>
       </Grid>
       </Grid>
      </form>
    </Paper>
   </Container>
  )
}

export default Auth