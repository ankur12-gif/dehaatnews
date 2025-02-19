import { createSlice } from "@reduxjs/toolkit";

// Helper function to get user data from localStorage with expiry check
const getStoredUserWithExpiry = () => {
    const userData = localStorage.getItem("user");

    if (!userData) return null;

    const { user, timestamp } = JSON.parse(userData);
    const now = new Date().getTime();

    // Check if 6 hours have passed since the user data was stored
    if (now - timestamp > 6 * 60 * 60 * 1000) {
        localStorage.removeItem("user"); // Remove expired user data
        return null;
    }

    return user; // Return the user data if it hasn't expired
};

// Get the user data from localStorage (if it exists and hasn't expired)
const storedUser = getStoredUserWithExpiry();

const initialState = { user: storedUser || null, loading: true };

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.loading = false;
            state.user = action.payload;

            // Store the user data along with a timestamp in localStorage
            const userData = {
                user: action.payload,
                timestamp: new Date().getTime(), // Current timestamp
            };
            localStorage.setItem("user", JSON.stringify(userData));
        },

        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
            localStorage.removeItem("user"); // Remove user data from localStorage
        },
    },
});

export const { userExist, userNotExist } = userReducer.actions;