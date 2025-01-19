import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData : null,
    userTodo: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },

        setUserTodo: (state, action) =>{
            state.userTodo = action.payload;
        }
    
    }
    
})

export const {login, logout, setUserTodo} = authSlice.actions;
export default authSlice.reducer;