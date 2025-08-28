import { createSlice } from "@reduxjs/toolkit";

const colorOptions = [
  {
    color: "from-blue-400 to-blue-600",
    text: "text-gray-800",
    border: "border-blue-300",
    label: "Blue",
  },
  {
    color: "from-green-400 to-emerald-600",
    text: "text-gray-800",
    border: "border-emerald-800",
    label: "Green",
  },
  {
    color: "from-purple-400 to-indigo-600",
    text: "text-gray-800",
    border: "border-blue-300",
    label: "Blue",
  },
  {
    color: "from-orange-400 to-pink-500",
    text: "text-gray-800",
    border: "border-orange-300",
    label: "Orange",
  },
  {
    color: "from-pink-400 to-rose-500",
    text: "text-gray-800",
    border: "border-purple-300",
    label: "Purple",
  },
  {
    color: "from-gray-700 to-gray-900",
    text: "text-gray-100",
    border: "border-gray-600",
    label: "Dark",
  },
];

const getRandomColor = () =>
  colorOptions[Math.floor(Math.random() * colorOptions.length)];

const initialNotes = [
  {
    id: "1",
    title: "Welcome to Mind Notes",
    content:
      "Quick notes, simple notes, memo pad! This is your digital notebook...",
    category: "personal",
    isPinned: true,
    color: "from-blue-400 to-blue-600", // Ocean Blue
    textColor: "text-gray-100",
    borderColor: "border-blue-300",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Meeting Agenda",
    content:
      "Quarterly targets discussion, team expansion plans, budget review...",
    category: "work",
    isPinned: false,
    color: "from-green-400 to-emerald-600", // Forest Green
    textColor: "text-gray-100",
    borderColor: "border-green-300",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Feature Ideas",
    content: "Voice notes, calendar integration, PDF export, sticky widgets...",
    category: "ideas",
    isPinned: false,
    color: "from-purple-400 to-indigo-600", // Purple Dream
    textColor: "text-gray-100",
    borderColor: "border-purple-300",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    title: "Shopping Checklist",
    content: "✓ Milk, bread, eggs\n• Fresh fruits\n• Coffee beans",
    category: "personal",
    isPinned: false,
    color: "from-orange-400 to-pink-500", // Sunset Orange
    textColor: "text-gray-100",
    borderColor: "border-yellow-300",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "5",
    title: "Reading List",
    content:
      'Must read books:\n• "Atomic Habits"\n• "The Psychology of Money"\n...',
    category: "personal",
    isPinned: true,
    color: "from-pink-400 to-rose-500", // Rose Gold
    textColor: "text-gray-100",
    borderColor: "border-pink-300",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "6",
    title: "Voice Memo Ideas",
    content: "Test voice recording feature...",
    category: "ideas",
    isPinned: false,
    color: "from-gray-700 to-gray-900", // Dark Mode
    textColor: "text-gray-100",
    borderColor: "border-indigo-300",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

const initialState = {
  notes: initialNotes,
  searchQuery: "",
  selectedNotes: [],
  selectMode: false,
  viewMode: "grid", // grid, list, calendar
  sortBy: "updatedAt", // updatedAt, createdAt, title, category
  sortOrder: "desc", // asc, desc
  filterBy: "all", // all, pinned, category
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.notes.unshift(action.payload);
      },
      prepare: () => {
        const randomColor = getRandomColor();
        return {
          payload: {
            id: Date.now().toString(),
            title: "",
            content: "",
            category: "personal",
            isPinned: false,
            ...randomColor,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      },
    },
    updateNote: (state, action) => {
      const { id, updates } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        Object.assign(note, updates, { updatedAt: new Date().toISOString() });
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.selectedNotes = state.selectedNotes.filter(
        (id) => id !== action.payload
      );
    },
    deleteSelectedNotes: (state) => {
      state.notes = state.notes.filter(
        (note) => !state.selectedNotes.includes(note.id)
      );
      state.selectedNotes = [];
      state.selectMode = false;
    },
    togglePin: (state, action) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        note.updatedAt = new Date().toISOString();
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSelectMode: (state) => {
      state.selectMode = !state.selectMode;
      if (!state.selectMode) {
        state.selectedNotes = [];
      }
    },
    toggleNoteSelection: (state, action) => {
      const noteId = action.payload;
      if (state.selectedNotes.includes(noteId)) {
        state.selectedNotes = state.selectedNotes.filter((id) => id !== noteId);
      } else {
        state.selectedNotes.push(noteId);
      }
    },
    selectAllNotes: (state) => {
      state.selectedNotes = state.notes.map((note) => note.id);
    },
    deselectAllNotes: (state) => {
      state.selectedNotes = [];
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  deleteSelectedNotes,
  togglePin,
  setSearchQuery,
  toggleSelectMode,
  toggleNoteSelection,
  selectAllNotes,
  deselectAllNotes,
  setViewMode,
  setSortBy,
  setSortOrder,
  setFilterBy,
} = notesSlice.actions;

export { colorOptions };
export default notesSlice.reducer;
