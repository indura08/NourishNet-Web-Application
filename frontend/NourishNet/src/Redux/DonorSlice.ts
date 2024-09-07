import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    currentUser:any;
    isFetching: boolean;
    error:boolean
}

const initialState:UserState = {
    currentUser: null ,
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