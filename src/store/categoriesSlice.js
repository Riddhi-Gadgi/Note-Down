import { createSlice } from "@reduxjs/toolkit";

// Updated initial categories with correct note counts
const initialCategories = [
  { id: "personal", name: "Personal", color: "bg-blue-500", noteCount: 3 },
  { id: "work", name: "Work", color: "bg-green-500", noteCount: 1 },
  { id: "ideas", name: "Ideas", color: "bg-purple-500", noteCount: 2 }, // Changed from 1 to 2
  { id: "projects", name: "Projects", color: "bg-orange-500", noteCount: 0 },
  { id: "health", name: "Health", color: "bg-red-500", noteCount: 0 },
  { id: "finance", name: "Finance", color: "bg-yellow-500", noteCount: 0 },
];

const initialState = {
  categories: initialCategories,
};

const categoriesSlice = createSlice({
  name: "categories",
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
      const category = state.categories.find((c) => c.id === id);
      if (category) {
        Object.assign(category, updates);
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },

    // Bulk replace counts (useful for recalculation from notes)
    updateNoteCounts: (state, action) => {
      Object.entries(action.payload).forEach(([categoryId, count]) => {
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) {
          category.noteCount = count;
        }
      });
    },

    // -- Minimal incremental helpers --
    incrementNoteCount: (state, action) => {
      const { categoryId, amount = 1 } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.noteCount = (category.noteCount || 0) + amount;
      }
    },

    decrementNoteCount: (state, action) => {
      const { categoryId, amount = 1 } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.noteCount = Math.max(0, (category.noteCount || 0) - amount);
      }
    },

    // Move counts from one category to another (use when a note's category changes)
    moveNoteBetweenCategories: (state, action) => {
      const { fromId, toId, amount = 1 } = action.payload;

      if (fromId) {
        const from = state.categories.find((c) => c.id === fromId);
        if (from) from.noteCount = Math.max(0, (from.noteCount || 0) - amount);
      }

      if (toId) {
        const to = state.categories.find((c) => c.id === toId);
        if (to) to.noteCount = (to.noteCount || 0) + amount;
      }
    },
  },
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  updateNoteCounts,
  incrementNoteCount,
  decrementNoteCount,
  moveNoteBetweenCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
