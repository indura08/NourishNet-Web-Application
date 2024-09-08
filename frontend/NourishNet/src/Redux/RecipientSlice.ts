import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { District } from "../../Models/Enums/DistrictValue"
import { Province } from "../../Models/Enums/ProvinceValue"
import { RecipientType } from "../../Models/Enums/RecipientType"
import { Role } from "../../Models/Enums/Role"
import { Recipient } from "../../Models/Recipient"

interface RecipientState {
    currentRecipient: Recipient
    isFetching: boolean,
    error:boolean
}

const initialState: RecipientState = {
    currentRecipient: {
        Id : "",
        RecipientName: "",
        ContactPerson: "",
        Phone: "",
        BaseDistrict: District.COLOMBO,
        BaseProvince: Province.WESTERN ,
        Address:"", 
        RecipientType: RecipientType.Volunteer,
        Role: Role.Recipient,
        Email: "", 
        Password: "" , 
        ConfirmPassword: "" ,  
        UserName: "" ,
        UserType: "Recipient"    
    },
    isFetching: false,
    error: false
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
        },
        loginFailure: (state) => {
            state.isFetching = false ;
            state.error = true;
        }
    }
})

export const { loginstart, loginSuccess, loginFailure} = RecipientSlice.actions;

export default RecipientSlice.reducer;