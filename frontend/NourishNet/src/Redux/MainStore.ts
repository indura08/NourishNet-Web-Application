import { configureStore } from "@reduxjs/toolkit";
import DonorSlice from "./DonorSlice";

export const store = configureStore({
    reducer: {
        donor: DonorSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>