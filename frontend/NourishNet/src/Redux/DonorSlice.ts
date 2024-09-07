import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Donor } from "../../Models/Donor"
import { Province } from "../../Models/Enums/ProvinceValue";
import { District } from "../../Models/Enums/DistrictValue";
import { Role } from "../../Models/Enums/Role";
interface UserState {
    currentUser:Donor;
    isFetching: boolean;
    error:boolean
}

const initialState:UserState = {
    currentUser: {
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
    error: false
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
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false ;
            state.error = true;
        }
    }
})

export const { loginstart, loginSuccess, loginFailure} = donorSlice.actions;

export default donorSlice.reducer;