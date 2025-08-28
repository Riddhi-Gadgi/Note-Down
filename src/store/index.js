import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notesSlice';
import categoriesSlice from './categoriesSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;