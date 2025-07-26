import { FormattedResumeJSON } from '@/interfaces/FormattedResumeJSON';
import { createSlice } from '@reduxjs/toolkit';

interface AfterSliceState {
  improvementsJson: string;
  improvedObject: FormattedResumeJSON | null;
  generatedLatex: string;
}

const initialState: AfterSliceState = {
  improvementsJson: '',
  improvedObject: null,
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
    setImprovedObject: (state, action) => {
      state.improvedObject = action.payload;
    },
    setGeneratedLatex: (state, action) => {
      state.generatedLatex = action.payload;
    },
  },
});

export const { setImprovementsJson, clearImprovementsJson, setImprovedObject, setGeneratedLatex } =
  afterSlice.actions;
export default afterSlice.reducer;
