// React component imports
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Trash2,
  X,
  CopyCheck,
} from "lucide-react";

// Redux hooks
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

// Import actions from notesSlice
import {
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
} from "../../store/notesSlice";

// Component imports
import BookCard from "../BookCard";
import NoteEditor from "./NoteEditor";
import ConfirmationDialog from "../ConfirmationDialog";
import {
  incrementNoteCount,
  decrementNoteCount,
  moveNoteBetweenCategories,
} from "../../store/categoriesSlice";

// Main Notes component
export default function Notes({ sidebarCollapsed }) {
  const dispatch = useAppDispatch();

  // Get state from Redux store
  const { notes, searchQuery, selectedNotes, selectMode } = useAppSelector(
    (state) => state.notes
  );
  const { categories } = useAppSelector((state) => state.categories);

  // Local state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  // Filter and sort notes based on current criteria
  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        !searchQuery ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Pinned notes first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then sort by update time (newest first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  // Function to create a new note
  const createNewNote = () => {
    const action = dispatch(addNote());
    const newNote = action.payload;
    // Increment note count for the default category
    dispatch(incrementNoteCount({ categoryId: newNote.category }));
    setExpandedNoteId(newNote.id);
  };

  // Function to pin/unpin a note
  const handlePin = (noteId) => {
    dispatch(togglePin(noteId));
  };

  // Function to update a note
  const handleUpdateNote = (id, updates) => {
    dispatch(updateNote({ id, updates }));
  };

  // Function to open delete confirmation dialog for a single note
  const openDeleteDialog = (id, title) => {
    const noteToDelete = notes.find((note) => note.id === id);
    setDeleteDialog({
      open: true,
      title: "Delete Note",
      message: `Are you sure you want to delete "${
        title || "this note"
      }"? This action cannot be undone.`,
      onConfirm: () => {
        // Decrement note count for the category
        dispatch(decrementNoteCount({ categoryId: noteToDelete.category }));
        dispatch(deleteNote(id));
        if (expandedNoteId === id) {
          setExpandedNoteId(null);
        }
        setDeleteDialog({
          open: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
      },
    });
  };

  // Function to open delete confirmation dialog for multiple notes
  const openBulkDeleteDialog = () => {
    setDeleteDialog({
      open: true,
      title: "Delete Notes",
      message: `Are you sure you want to delete ${selectedNotes.length} selected notes? This action cannot be undone.`,
      onConfirm: () => {
        dispatch(deleteSelectedNotes());
        setDeleteDialog({
          open: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
      },
    });
  };

  // Function to close delete dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  // Function to toggle note selection
  const handleSelectToggle = (noteId) => {
    dispatch(toggleNoteSelection(noteId));
  };

  // Get the currently expanded note
  const expandedNote = expandedNoteId
    ? notes.find((n) => n.id === expandedNoteId)
    : null;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Unified delete confirmation dialog - now positioned fixed to appear as overlay */}
      {deleteDialog.open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <ConfirmationDialog
            open={deleteDialog.open}
            title={deleteDialog.title}
            message={deleteDialog.message}
            onConfirm={deleteDialog.onConfirm}
            onCancel={closeDeleteDialog}
          />
        </div>
      )}

      {/* Header section */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-black">My Notes</h1>
              <p className="text-gray-500 mt-1">{filteredNotes.length} notes</p>
            </div>

            {/* Action buttons - changes based on select mode */}
            <div className="flex items-center gap-3">
              {selectMode ? (
                // Select mode UI
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedNotes.length} selected
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(selectAllNotes())}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
                  >
                    Select All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openBulkDeleteDialog}
                    disabled={selectedNotes.length === 0}
                    className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(toggleSelectMode())}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                // Normal mode UI
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(toggleSelectMode())}
                    className="px-4 py-2 bg-white/80 border border-white/30 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <CopyCheck className="w-4 h-4" />
                    Select
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createNewNote}
                    className="bg-black text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    New Note
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Search and filter section */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/30 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-8 rounded-2xl border border-white/30 backdrop-blur-sm flex items-center gap-2 transition-all duration-300 ${
                showFilters
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-purple/80 hover:bg-white/90"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </motion.button>
          </div>

          {/* Category filters (animated) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 flex-wrap"
              >
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "bg-black text-white shadow-lg"
                      : "bg-white/80 border border-white/30 hover:bg-white/90"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? "bg-black text-white shadow-lg"
                        : "bg-white/80 border border-white/30 hover:bg-white/90"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notes grid/list view */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          {filteredNotes.length === 0 ? (
            // Empty state
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No notes found
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first note to get started
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createNewNote}
                className="bg-black text-white px-6 py-3 rounded-2xl shadow-lg"
              >
                Create First Note
              </motion.button>
            </div>
          ) : (
            // Notes grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              <AnimatePresence>
                {filteredNotes.map((note) => {
                  const category = categories.find(
                    (c) => c.id === note.category
                  );
                  return (
                    <BookCard
                      key={note.id}
                      note={note}
                      category={category}
                      onExpand={() => setExpandedNoteId(note.id)}
                      isSelected={selectedNotes.includes(note.id)}
                      onSelectToggle={() => handleSelectToggle(note.id)}
                      selectMode={selectMode}
                      onDelete={() => openDeleteDialog(note.id, note.title)} // This line changed
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Note editor modal (appears when a note is expanded) */}
      <AnimatePresence>
        {expandedNote && (
          <NoteEditor
            note={expandedNote}
            categories={categories}
            onUpdate={handleUpdateNote}
            onPin={() => handlePin(expandedNote.id)}
            onDelete={() =>
              openDeleteDialog(expandedNote.id, expandedNote.title)
            }
            onClose={() => setExpandedNoteId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
