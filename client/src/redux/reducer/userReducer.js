import { createSlice } from "@reduxjs/toolkit";


const initialState = { user: null, loading: null }

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },

        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
        }

    }
})



export const { userExist, userNotExist } = userReducer.actions;