import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FolderOpen } from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import CategoryCard from "./CategoryCard";
import CategoryFormModal from "./CategoryFormModal";

export default function Categories() {
  const { categories } = useAppSelector((state) => state.categories);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsCreating(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsCreating(true);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingCategory(null);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Categories</h1>
              <p className="text-gray-500 mt-1">
                Organize your notes with colorful categories
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreate}
              className="bg-black text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              New Category
            </motion.button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {categories.length > 0 ? (
            <div className="flex flex-col gap-3">
              {" "}
              {/* vertical bar list */}
              <AnimatePresence>
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEdit}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState onCreate={handleCreate} />
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <CategoryFormModal
        isOpen={isCreating}
        onClose={closeModal}
        category={editingCategory}
      />
    </div>
  );
}

// Empty State Component
const EmptyState = ({ onCreate }) => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <FolderOpen className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No categories yet
    </h3>
    <p className="text-gray-500 mb-6">
      Create your first category to organize your notes
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onCreate}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg"
    >
      Create Category
    </motion.button>
  </div>
);
