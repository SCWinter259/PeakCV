import { createSlice } from '@reduxjs/toolkit';

interface BeforeSliceState {
  resumeJson: string;
}

const initialState: BeforeSliceState = {
  resumeJson: '',
};

export const beforeSlice = createSlice({
  name: 'before',
  initialState,
  reducers: {
    setResumeJson: (state, action) => {
      state.resumeJson = action.payload;
    },
    // right now we are not using clearResumeJson yet,
    // but it can be useful when we implement the change resume feature?
    clearResumeJson: (state) => {
      state.resumeJson = '';
    },
  },
});

export const { setResumeJson, clearResumeJson } = beforeSlice.actions;
export default beforeSlice.reducer;
