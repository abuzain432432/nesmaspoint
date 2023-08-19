import { createSlice } from "@reduxjs/toolkit";



export const ads = createSlice({
    name: "ads",
    initialState: {},
    reducers:{
        addData: (state,action)=>{
            console.log("********",action)
            return {...state, ...action.payload}
        }
    }
})

export const {addData} = ads.actions
export default ads.reducer