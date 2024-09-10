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
        if(res.data){
             navigate("/recipient/profile")}
        else {
            dispatch(loginFailure())
        }
        console.log(res.data.recipient)
        dispatch(loginSuccess(res.data));
        console.log(res.data);
    }catch(err){
        dispatch(loginFailure());
    }
};