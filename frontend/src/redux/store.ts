import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notification.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
    reducer:{
        notification: notificationReducer,
        user: userReducer 
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;