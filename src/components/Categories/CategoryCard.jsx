import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, FolderOpen } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteCategory } from "../../store/categoriesSlice";
import ConfirmationDialog from "../ConfirmationDialog";

export default function CategoryCard({ category, onEdit }) {
  const dispatch = useAppDispatch();
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleDeleteClick = () => {
    setDeleteDialog({
      open: true,
      title: "Delete Category",
      message: `Are you sure you want to delete the "${category.name}" category? Notes in this category will be moved to Personal.`,
      onConfirm: () => {
        dispatch(deleteCategory(category.id));
        setDeleteDialog({
          open: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
      },
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  return (
    <>
      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        open={deleteDialog.open}
        title={deleteDialog.title}
        message={deleteDialog.message}
        onConfirm={deleteDialog.onConfirm}
        onCancel={closeDeleteDialog}
      />

      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ scale: 1.01 }}
        className="flex items-center justify-between w-full bg-white/80 backdrop-blur-md rounded-xl border border-white/30 px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 group"
      >
        {/* Left side: Icon + Name + Notes */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center shadow`}
          >
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate max-w-xs">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {category.noteCount} {category.noteCount === 1 ? "note" : "notes"}
            </p>
          </div>
        </div>

        {/* Right side: Type + Actions */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100/60 rounded-full">
            {category.id === "personal" ? "Default" : "Custom"}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(category)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              title="Edit category"
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </motion.button>

            {category.id !== "personal" && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDeleteClick}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
