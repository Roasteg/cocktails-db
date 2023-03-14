import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createNotification } from "./notification.reducer";

interface User {
    username: string,
    token: string
}

const initialState: User = {
    username: "",
    token: ""
}

export const auth = createAsyncThunk(
    "auth/login",
    async(body: {username: string, password: string}, {dispatch}) => {
        try {
            axios.post("http://localhost:8000/auth/login", {},
            {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                auth: {
                    username: body.username,
                    password: body.password
                }
            }).then(({data}) => {
                return data
            }).catch((error)=> {
                dispatch(createNotification({text: error.message, type: "error", timeout: 4000}));
                return error
            });
        }
        catch (error) {
            dispatch(createNotification({text: "error", type: "error", timeout: 1000}));
            return error
        } 
    }
)

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(auth.fulfilled, (state, {payload}) => {
            console.log(payload);
        })
    },
})

export default userReducer.reducer;