import { NavigateFunction } from "react-router-dom";
import { loginFailure, loginstart, loginSuccess } from "./RecipientSlice";
import axios from "axios";
import { AppDispatch } from "./MainStore";

interface LoginDto {
    email:string;
    password: string
}

export const login = async(dispatch:AppDispatch , loginInfo:LoginDto , navigate:NavigateFunction ) => {
    dispatch(loginstart());
    try {
        const res = await axios.post("http://localhost:5223/api/Recipient/login" , loginInfo);
        if(res.data.response.flag){
             navigate("/recipient/profile")}
        else {
            dispatch(loginFailure())
        }
        dispatch(loginSuccess(res.data));
        console.log(res.data.recipient) //'this is for debuggin purposes 
        console.log(res.data); //this line also is for debuggin purposes
    }catch(err){
        dispatch(loginFailure());
    }
};