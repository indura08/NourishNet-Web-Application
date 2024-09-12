import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Donor } from "../../Models/Donor"
import { Province } from "../../Models/Enums/ProvinceValue";
import { District } from "../../Models/Enums/DistrictValue";
import { Role } from "../../Models/Enums/Role";

const saveddonor = localStorage.getItem("donor");
const savedToken = localStorage.getItem("dtoken")

interface UserState {
    currentDonor:Donor;
    isFetching: boolean,
    error:boolean,
    dtoken: string
}

const initialState:UserState = {
    currentDonor: saveddonor ? JSON.parse(saveddonor) : {
        Id:"",
        OrganizationName:"", 
        OrganizationType: "", 
        ContactPerson:"",
        Phone: "",
        BaseDistrict: District.COLOMBO,
        BaseProvince: Province.WESTERN, 
        Address: "",
        OperatingHours: "", 
        Email: "", 
        Password: "", 
        ConfirmPassword: "", 
        UserName: "",
        Role: Role.Donor, 
        UserType: ""
    } ,
    isFetching: false,
    error: false,
    dtoken: savedToken ? savedToken : ""
}

const donorSlice = createSlice({
    name: "donor",
    initialState,
    reducers:{
        loginstart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.isFetching = false;
            state.currentDonor = action.payload.donor;
            state.dtoken = action.payload.response.token;

            localStorage.setItem("donor" , JSON.stringify(state.currentDonor));
            localStorage.setItem("dtoken", state.dtoken)
        },
        loginFailure: (state) => {
            state.isFetching = false ;
            state.error = true;
        },

        logout : (state) => {
            state.currentDonor = initialState.currentDonor
            state.dtoken = initialState.dtoken

            localStorage.removeItem("donor");
            localStorage.removeItem("dtoken");
        }
    }
})

export const { loginstart, loginSuccess, loginFailure, logout} = donorSlice.actions;

export default donorSlice.reducer;