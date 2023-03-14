import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"

interface Notification {
    visible?: boolean,
    text: string,
    type: "success" | "error",
    withIcon?: boolean
}

const initialState: Notification = {
    visible: true,
    type: "success",
    withIcon: true,
    text: "Notification"
}


const showNotification = createAction<Notification | undefined>('alerts/showNotificaion');
const hideNotification = createAction("alerts/hideNotification");

export const createNotification = createAsyncThunk(
    'alerts/createNotification',
    async(body: {text: string, timeout: number, type: "success" | "error"}, {dispatch}) => {
        dispatch(showNotification({text: body.text, type: body.type}));
        setTimeout(()=> {
            dispatch(hideNotification())
        }, body.timeout);
    }
)


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(showNotification, (state, action) => {
            state.visible = true;
            state.text = action.payload?.text ? action.payload.text : "";
            state.type = action.payload?.type ? action.payload.type : "success";
        });
        builder.addCase(hideNotification, (state) => {
            state.visible = false;
        })
    }
})

export default notificationSlice.reducer;