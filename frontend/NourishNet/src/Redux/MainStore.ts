import { configureStore } from "@reduxjs/toolkit";
import DonorSlice from "./DonorSlice";
import RecipientSlice from "./RecipientSlice";

export const store = configureStore({
    reducer: {
        donor: DonorSlice,
        recipient: RecipientSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>