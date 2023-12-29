import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: null,
    isUserActive: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeLogin: (state, action) => {
            state.userData = action.payload;
            state.isUserActive = true;
        },
        storeLogout: (state) => {
            state.userData = null;
            state.isUserActive = false;
        }
    }
});

export const { storeLogin, storeLogout } = userSlice.actions

export const userSliceReducer = userSlice.reducer