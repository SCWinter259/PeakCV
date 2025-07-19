import { configureStore } from '@reduxjs/toolkit';
import beforeReducer from './features/beforeSlice';
import afterReducer from './features/afterSlice';

export const store = configureStore({
  reducer: {
    before: beforeReducer,
    after: afterReducer,
  },
});

// Inferred types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
