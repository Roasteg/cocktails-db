import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"

interface Notification {
    visible: boolean,
    type: "success" | "error"
}

const initialState: Notification = {
    visible: false,
    type: "success"
}


const showNotification = createAction<Notification | undefined>('alerts/showNotificaion');
const hideNotification = createAction("alerts/hideNotification");

export const createNotification = createAsyncThunk(
    'alerts/createNotification',
    async(body: {timeout: number, type: "success" | "error"}, {dispatch}) => {
        dispatch(showNotification({visible: true, type: body.type}));
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
            state.visible = action.payload?.visible ? action.payload.visible : true;
            state.type = action.payload?.type ? action.payload.type : "success";
            console.log(state.visible);
            
        });
        builder.addCase(hideNotification, (state) => {
            state.visible = false;
            console.log(state.visible);
        })
    }
})

export default notificationSlice.reducer;