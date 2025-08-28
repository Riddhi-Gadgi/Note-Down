import { createSlice } from '@reduxjs/toolkit';

const initialCategories = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-500', noteCount: 3 },
  { id: 'work', name: 'Work', color: 'bg-green-500', noteCount: 1 },
  { id: 'ideas', name: 'Ideas', color: 'bg-purple-500', noteCount: 1 },
  { id: 'projects', name: 'Projects', color: 'bg-orange-500', noteCount: 0 },
  { id: 'health', name: 'Health', color: 'bg-red-500', noteCount: 0 },
  { id: 'finance', name: 'Finance', color: 'bg-yellow-500', noteCount: 0 },
];

const initialState = {
  categories: initialCategories,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now().toString(),
        ...action.payload,
        noteCount: 0,
      };
      state.categories.push(newCategory);
    },
    updateCategory: (state, action) => {
      const { id, updates } = action.payload;
      const category = state.categories.find(c => c.id === id);
      if (category) {
        Object.assign(category, updates);
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    updateNoteCounts: (state, action) => {
      Object.entries(action.payload).forEach(([categoryId, count]) => {
        const category = state.categories.find(c => c.id === categoryId);
        if (category) {
          category.noteCount = count;
        }
      });
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, updateNoteCounts } = categoriesSlice.actions;
export default categoriesSlice.reducer;