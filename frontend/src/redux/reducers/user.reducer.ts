import { createSlice } from "@reduxjs/toolkit";

interface User {
    username: string,
    token: string
}

const initialState: User = {
    username: "",
    token: ""
}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {},
})