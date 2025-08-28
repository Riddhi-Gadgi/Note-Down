import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderOpen, Save } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addCategory, updateCategory } from "../../store/categoriesSlice";
import ConfirmationDialog from "../ConfirmationDialog";

const categoryColors = [
  { color: "bg-red-500", name: "Red" },
  { color: "bg-orange-500", name: "Orange" },
  { color: "bg-yellow-500", name: "Yellow" },
  { color: "bg-green-500", name: "Green" },
  { color: "bg-blue-500", name: "Blue" },
  { color: "bg-indigo-500", name: "Indigo" },
  { color: "bg-purple-500", name: "Purple" },
  { color: "bg-pink-500", name: "Pink" },
  { color: "bg-gray-500", name: "Gray" },
];

export default function CategoryFormModal({ isOpen, onClose, category }) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    confirmButtonStyle: "bg-black hover:bg-gray-800",
    onConfirm: () => {},
  });

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSelectedColor(category.color);
    } else {
      setName("");
      setSelectedColor("bg-blue-500");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setConfirmDialog({
      open: true,
      title: "Save Category",
      message: "Are you sure you want to save this category?",
      confirmText: category ? "Update" : "Create",
      confirmButtonStyle: "bg-black hover:bg-gray-800",
      onConfirm: () => {
        if (category) {
          dispatch(
            updateCategory({
              id: category.id,
              updates: { name: name.trim(), color: selectedColor },
            })
          );
        } else {
          dispatch(addCategory({ name: name.trim(), color: selectedColor }));
        }
        onClose();
      },
    });
  };

  const handleCancelClick = () => {
    if (name.trim() || selectedColor !== (category?.color || "bg-blue-500")) {
      setConfirmDialog({
        open: true,
        title: "Discard Changes?",
        message: "You have unsaved changes. Do you really want to close?",
        confirmText: "Discard",
        confirmButtonStyle: "bg-red-600 hover:bg-red-700",
        onConfirm: () => {
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  return (
    <AnimatePresence>
      {/* Unified Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        confirmButtonStyle={confirmDialog.confirmButtonStyle}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirmDialog}
      />

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCancelClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${selectedColor} rounded-2xl flex items-center justify-center`}
                >
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category ? "Edit Category" : "New Category"}
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancelClick}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter category name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {categoryColors.map((color) => (
                    <motion.button
                      key={color.color}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.color)}
                      className={`w-12 h-12 rounded-2xl ${
                        color.color
                      } transition-all duration-300 ${
                        selectedColor === color.color
                          ? "ring-4 ring-blue-500/50 scale-110"
                          : "hover:scale-105"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelClick}
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 bg-white/80 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!name.trim()}
                  className="flex-1 px-4 py-3 rounded-2xl bg-black text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {category ? "Update" : "Create"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
