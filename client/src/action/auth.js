import { Navigate } from "react-router-dom";
import * as api from "../api";
import {AUTH } from "../consts/actiontypes";

export const signin =(formdata,history)=>async(dispatch)=>{
  try{
    const {data} = await api.signIn(formdata)
    dispatch({type:AUTH,data})
    history("/")
  }catch(e){
    alert(" wrong credentials")
  }
}

export const signup =(formdata,history)=>async(dispatch)=>{
  try{
    const {data} = await api.signUp(formdata)
    dispatch({type:AUTH,data})
    history("/")
  }catch(e){
    alert("User already exist")
  }
}