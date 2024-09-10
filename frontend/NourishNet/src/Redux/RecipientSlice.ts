import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { District } from "../../Models/Enums/DistrictValue"
import { Province } from "../../Models/Enums/ProvinceValue"
import { RecipientType } from "../../Models/Enums/RecipientType"
import { Role } from "../../Models/Enums/Role"
import { Recipient } from "../../Models/Recipient"

const savedRecipient = localStorage.getItem("recipient");
const rtoken = localStorage.getItem("rtoken");

interface RecipientState {
    currentRecipient: Recipient
    isFetching: boolean,
    error:boolean
    token:string
}

const initialState: RecipientState = {
    currentRecipient: savedRecipient ? JSON.parse(savedRecipient) : {
        id : "",
        recipientName: "",
        contactPerson: "",
        phone: "",
        baseDistrict: District.COLOMBO,
        baseProvince: Province.WESTERN ,
        address:"", 
        recipientType: RecipientType.Volunteer,
        role: Role.Recipient,
        email: "", 
        password: "" , 
        confirmPassword: "" ,  
        userName: "" ,
        userType: "Recipient"    
    },
    isFetching: false,
    error: false,
    token: rtoken ? rtoken : ""
}

const RecipientSlice = createSlice({
    name: "recipient",
    initialState,
    reducers: {
        loginstart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.isFetching = false;
            state.currentRecipient = action.payload.recipient;
            state.token = action.payload.response.token;
            console.log(state.token)

            localStorage.setItem("recipient" , JSON.stringify(state.currentRecipient));
            localStorage.setItem("rtoken", state.token)
        },
        loginFailure: (state) => {
            state.isFetching = false ;
            state.error = true;
        },

        logout: (state) => {
            state.currentRecipient = initialState.currentRecipient;
            state.token = ""

            localStorage.removeItem("recipient");
            localStorage.removeItem("rtoken")
        }
    }
})

export const { loginstart, loginSuccess, loginFailure, logout} = RecipientSlice.actions;

export default RecipientSlice.reducer;