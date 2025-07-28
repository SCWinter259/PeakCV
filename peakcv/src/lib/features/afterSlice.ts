import { FormattedResumeJSON } from '@/interfaces/FormattedResumeJSON';
import { createSlice } from '@reduxjs/toolkit';

interface AfterSliceState {
  improvementsJson: string;
  generatedLatex: string;
}

const initialState: AfterSliceState = {
  improvementsJson: '',
  generatedLatex: '',
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
    setGeneratedLatex: (state, action) => {
      state.generatedLatex = action.payload;
    },
  },
});

export const { setImprovementsJson, clearImprovementsJson, setGeneratedLatex } = afterSlice.actions;
export default afterSlice.reducer;
