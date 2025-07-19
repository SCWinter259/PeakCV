import { createSlice } from '@reduxjs/toolkit';

interface AfterSliceState {
  improvementsJson: string;
}

const initialState: AfterSliceState = {
  improvementsJson: '',
};

export const afterSlice = createSlice({
  name: 'after',
  initialState,
  reducers: {
    setImprovementsJson: (state, action) => {
      state.improvementsJson = action.payload;
    },
    clearImprovementsJson: (state) => {
      state.improvementsJson = '';
    },
  },
});

export const { setImprovementsJson, clearImprovementsJson } = afterSlice.actions;
export default afterSlice.reducer;