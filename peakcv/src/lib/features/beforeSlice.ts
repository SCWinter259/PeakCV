import { createSlice } from "@reduxjs/toolkit";

interface BeforeSliceState {
    resumeJson: string;
}

const initialState: BeforeSliceState = {
    resumeJson: '',
}

export const beforeSlice = createSlice({
    name: 'before',
    initialState,
    reducers: {
        setResumeJson: (state, action) => {
            state.resumeJson = action.payload;
        },
        clearResumeJson: (state) => {
            state.resumeJson = '';
        }
    }
});

export const { setResumeJson, clearResumeJson } = beforeSlice.actions;
export default beforeSlice.reducer;