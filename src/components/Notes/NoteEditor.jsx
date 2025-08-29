import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Trash2, X, ChevronDown, Palette, Tag, Check } from "lucide-react";
import { colorOptions, updateNote } from "../../store/notesSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { moveNoteBetweenCategories } from "../../store/categoriesSlice";

export default function NoteEditor({
  note,
  categories,
  onUpdate,
  onPin,
  onDelete,
  onClose,
}) {
  const dispatch = useAppDispatch();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const category = categories.find((c) => c.id === note.category);
  const currentColorOption = colorOptions.find(
    (option) => option.color === note.color
  );

  // 🔑 Generic handler
  const handleChange = (field, value) => {
    dispatch(updateNote({ id: note.id, updates: { [field]: value } }));
  };

  const handleCategoryChange = (categoryId) => {
    const oldCategoryId = note.category;
    // Update the note first
    handleChange("category", categoryId);
    // Then update category counts
    dispatch(
      moveNoteBetweenCategories({
        fromId: oldCategoryId,
        toId: categoryId,
        amount: 1,
      })
    );
    setShowCategoryDropdown(false);
  };

  const handleColorChange = (colorOption) => {
    dispatch(
      updateNote({
        id: note.id,
        updates: {
          color: colorOption.color,
          textColor: colorOption.text,
          borderColor: colorOption.border,
        },
      })
    );
    setShowColorPicker(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden ${note.color} ${note.borderColor} border-2`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: (() => {
            switch (note.color) {
              case "from-blue-400 to-blue-600":
                return "linear-gradient(135deg, #60A5FA, #2563EB)"; // blue
              case "from-green-400 to-emerald-600":
                return "linear-gradient(135deg, #34D399, #059669)"; // green
              case "from-purple-400 to-indigo-600":
                return "linear-gradient(135deg, #A78BFA, #4F46E5)"; // purple-indigo
              case "from-orange-400 to-pink-500":
                return "linear-gradient(135deg, #F97316, #EC4899)"; // orange-pink
              case "from-pink-400 to-rose-500":
                return "linear-gradient(135deg, #F472B6, #F43F5E)"; // pink-rose
              case "from-gray-700 to-gray-900":
                return "linear-gradient(135deg, #374151, #111827)"; // dark mode
              default:
                return "linear-gradient(135deg, #1F2937, #111827)"; // fallback sleek gray
            }
          })(),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-white/80 ${note.textColor}`}
        >
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPin}
              className={`p-2 rounded-xl hover:bg-white/20 transition-colors ${
                note.isPinned ? "bg-white/30" : ""
              }`}
              title={note.isPinned ? "Unpin" : "Pin"}
            >
              <Pin
                className={`w-5 h-5 ${note.isPinned ? "fill-current" : ""}`}
              />
            </motion.button>

            {/* Category Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/80 bg-white text-black transition-colors"
              >
                {category && (
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                )}
                <Tag className="w-4 h-4" />
                <span className="text-sm">{category?.name || "Personal"}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden z-10"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/50 text-gray-700 transition-colors"
                      >
                        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color Picker */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-1"
                title="Change Color"
              >
                <Palette className="w-5 h-5" />
                {currentColorOption && (
                  <div
                    className={`w-3 h-3 rounded-full ${currentColorOption.color.replace(
                      "from-",
                      "bg-"
                    )} border ${currentColorOption.border}`}
                  ></div>
                )}
              </motion.button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-3 z-10"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((option) => {
                        const isSelected = note.color === option.color;
                        return (
                          <motion.button
                            key={option.label}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleColorChange(option)}
                            className={`w-8 h-8 rounded-full relative ${
                              option.color
                            } ${
                              option.border
                            } border-2 shadow-lg transition-transform ${
                              isSelected ? "ring-2 ring-white" : ""
                            }`}
                            title={option.label}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-600">
                      {currentColorOption?.label || "Current color"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-2 rounded-xl hover:bg-red-100/50 text-red-500 transition-colors bg-gray-300"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col h-full">
          <input
            type="text"
            value={note.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full text-3xl font-bold mb-6 bg-transparent border-none outline-none placeholder-current/50 ${note.textColor}`}
            placeholder="Note title..."
          />

          <textarea
            value={note.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className={`flex-1 w-full text-lg bg-transparent border-none outline-none resize-none placeholder-current/50 leading-relaxed ${note.textColor}`}
            placeholder="Start writing your note..."
          />
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t border-white/20 text-sm ${note.textColor} opacity-70`}
        >
          <div className="flex justify-between items-center">
            <span>
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </span>
            <span>
              Created: {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
