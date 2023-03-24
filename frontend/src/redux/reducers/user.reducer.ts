import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Builder } from "postcss";
import { createNotification } from "./notification.reducer";

interface User {
    id: string,
    username: string,
    token: string
}

const initialState: User = {
    id: "",
    username: "",
    token: ""
}

const auth = createAsyncThunk(
    "auth/login",
    async(body: {username: string, password: string}, {dispatch, rejectWithValue}) => {
        try {
            return axios.post("http://localhost:8000/auth/login", {},
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
                dispatch(createNotification({text: error.response.data.message, type: "error", timeout: 4000}));
                return rejectWithValue(error.response.data);
            });
        }
        catch (error) {
            dispatch(createNotification({text: "Error", type: "error", timeout: 1000}));
            return error
        } 
    }
)

const register = createAsyncThunk(
    "auth/register",
    async(body: {username: string, password: string}, {dispatch}) => {
        try {
            axios.post("http://localhost:8000/auth/register", {
                username: body.username,
                password: body.password
            }).then((data) => {
                return data;
            }).catch((error) => {
                dispatch(createNotification({text: error.response.data.message, type: "error", timeout: 4000}));
                return error;
            })
        } catch(error) {
            dispatch(createNotification({text: "Error", type: "error", timeout: 2000}));
            return error;
        }
    }
)

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(auth.fulfilled, (state:User, {payload}) => {
            sessionStorage.setItem("token", payload.user.token as string);
            state.id = payload.user.id;
            state.token = payload.user.token;
            state.username = payload.user.username;
        });
        // builder.addCase(register.fulfilled, (state, {payload}) => {
        // })
    },
})


export {auth, register};
export default userReducer.reducer;