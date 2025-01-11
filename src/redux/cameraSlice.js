const { createSlice } = require("@reduxjs/toolkit");

const cameraSlice= createSlice({
    name:'camera',
    initialState:{
        videoRef: null,
    },
    reducers:{
        setVideoRef: (state,action)=>{
            state.videoRef= action.payload?.videoRef
        }
    }
});

const {setVideoRef}= cameraSlice.actions;
export default cameraSlice.reducer;