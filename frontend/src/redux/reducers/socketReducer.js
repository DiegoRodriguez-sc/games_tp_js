import { createSlice } from "@reduxjs/toolkit";


const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket:null,
        online:false,
        users:[]
    },
    reducers:{
        loadUsers:(state,action)=>{
            // state.users = [...state.users, ...action.payload];
            console.log(action.payload);
        },
        connectSocket:(state, action)=>{
            console.log(action.payload);
            // state.socket = action.payload.socket;
            // state.online = action.payload.online;
        },
        desconnectSocket:(state, action)=>{
            console.log(action.payload)
            // state.socket=null;
            // state.online=action.payload.online;
        }
    },
});


export const {loadUsers, connectSocket, desconnectSocket} = socketSlice.actions;
export default socketSlice.reducer;