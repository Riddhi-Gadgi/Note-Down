import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreVertical,
  Trash2,
  Edit,
  CheckSquare,
  Square,
  Pin,
  Bookmark,
} from "lucide-react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { togglePin, deleteNote } from "../store/notesSlice";

export default function BookCard({
  note,
  category,
  onExpand,
  isSelected,
  onSelectToggle,
  selectMode,
}) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleBodyClick = () => {
    if (selectMode) {
      onSelectToggle();
    } else {
      onExpand(note.id);
    }
  };

  const handlePin = (e) => {
    e.stopPropagation();
    dispatch(togglePin(note.id));
    setMenuOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(note.id));
    }
    setMenuOpen(false);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2, scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMenuOpen(false);
      }}
      className={`relative w-46 h-52 rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300 cursor-pointer
        ${note.isPinned ? "ring-2 ring-gray-600 shadow-xl" : "hover:shadow-xl"}
        ${isSelected ? "ring-2 ring-purple-400" : ""}
      `}
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
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Category stripe */}
      <div
        className={`absolute top-0 left-0 w-2 h-full ${
          category?.color || "bg-gray-500"
        } backdrop-opacity-90 rounded-l-2xl`}
      />

      {/* Pinned indicator */}
      {note.isPinned && (
        <div className="absolute top-0 right-1 z-40">
          <Bookmark className="w-5 h-5 text-gray-100 fill-gray-200" />
        </div>
      )}

      {/* Select checkbox */}
      {(hovered || selectMode) && (
        <div className="absolute top-2 left-2 z-50">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectToggle();
            }}
            className="p-1 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 shadow-sm hover:bg-white transition-colors"
            aria-label={isSelected ? "Deselect" : "Select"}
          >
            {isSelected ? (
              <CheckSquare className="w-4 h-4 text-purple-600" />
            ) : (
              <Square className="w-4 h-4 text-gray-600" />
            )}
          </motion.button>
        </div>
      )}

      {/* More menu */}
      {hovered && !selectMode && (
        <div className="absolute bottom-2 right-2 z-50">
          <div className="relative">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1 bg-white/90 backdrop-blur-sm rounded-full border border-white/30 shadow-sm hover:bg-white transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </motion.button>

            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute -top-20 mb-2 w-32 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/30 overflow-hidden z-60"
              >
                <button
                  onClick={handlePin}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm transition-colors"
                >
                  <Pin className="w-4 h-4" />
                  {note.isPinned ? "Unpin" : "Pin"}
                </button>

                <button
                  onClick={() => {
                    onExpand(note.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      <div
        onClick={handleBodyClick}
        className="p-4 flex flex-col justify-between"
      >
        <div className="flex-1">
          <h2
            className={`text-md font-semibold mb-2 line-clamp-2 ${
              note.textColor || "text-gray-800"
            }`}
          >
            {note.title || "Untitled"}
          </h2>
          <div
            className={`text-xs leading-relaxed line-clamp-4 ${
              note.textColor || "text-gray-700"
            } opacity-80`}
          >
            {note.content || "No content yet"}
          </div>
        </div>

        {/* Category pill */}
        <div className="mt-3">
          <span className=" absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/60 backdrop-blur-sm border border-white/30">
            <span
              className={`w-2 h-2 rounded-full ${
                category?.color || "bg-blue-500"
              }`}
            />
            <span className="text-gray-700 font-medium">
              {category?.name || "Personal"}
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
