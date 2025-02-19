import { createSlice } from "@reduxjs/toolkit";



const initialState = { category: "general", loadingCategory: true };

export const postReducer = createSlice({
    name: "postCategory",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        }
    }
})



export const { setCategory } = postReducer.actions;