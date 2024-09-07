import axios from "axios";
import { loginFailure, loginSuccess, loginstart } from "./DonorSlice";
import { AppDispatch } from "./MainStore";


interface LoginDto {
    email:string;
    password: string
}
export const login = async(dispatch:AppDispatch , loginInfo:LoginDto) => {
    dispatch(loginstart());
    try {
        const res = await axios.post("http://localhost:5223/api/Donor/login" , loginInfo);
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        console.log()
    }catch(err){
        dispatch(loginFailure());
    }
};