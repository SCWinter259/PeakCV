import { configureStore } from '@reduxjs/toolkit';
import beforeReducer from './features/beforeSlice';

export const store = configureStore({
  reducer: {
    before: beforeReducer,
  },
});

// Inferred types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
