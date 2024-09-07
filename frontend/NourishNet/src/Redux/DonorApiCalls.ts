import axios from "axios";
import { loginFailure, loginSuccess, loginstart } from "./DonorSlice";
import { AppDispatch } from "./MainStore";
//import { Donor } from "../../Models/Donor";
import { NavigateFunction } from "react-router-dom";

interface LoginDto {
    email:string;
    password: string
}

export const login = async(dispatch:AppDispatch , loginInfo:LoginDto , navigate:NavigateFunction ) => {
    dispatch(loginstart());
    try {
        const res = await axios.post("http://localhost:5223/api/Donor/login" , loginInfo);

        navigate("/donor/profile") 

        console.log(res.data)
        dispatch(loginSuccess(res.data));
        console.log(res.data.token);
    }catch(err){
        dispatch(loginFailure());
    }
};

// export const register = async(dispatch:AppDispatch , donorDto : Donor) => {
//     // dispatch()
// }