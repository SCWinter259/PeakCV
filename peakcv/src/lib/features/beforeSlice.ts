import { createSlice } from '@reduxjs/toolkit';

interface BeforeSliceState {
  resumeJson: string;
  jobDescription: string;
}

const initialState: BeforeSliceState = {
  resumeJson: '',
  jobDescription: '',
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
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
  },
});

export const { setResumeJson, clearResumeJson, setJobDescription } = beforeSlice.actions;
export default beforeSlice.reducer;
