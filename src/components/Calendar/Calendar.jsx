import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const { notes } = useAppSelector((state) => state.notes);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getNotesForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toDateString();
    return notes.filter((note) => {
      const noteDate = new Date(note.createdAt).toDateString();
      return noteDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-black">Calendar</h1>
              <p className="text-gray-500 mt-1">View your notes by date</p>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-xl bg-white/80 border border-white/30 hover:bg-white/90 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <h2 className="text-xl font-semibold text-gray-800">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-xl bg-white/80 border border-white/30 hover:bg-white/90 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 overflow-hidden">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b border-gray-200/50">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="p-4 text-center font-medium text-gray-600 bg-gray-50/50"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {days.map((date, index) => {
                const dayNotes = getNotesForDate(date);

                return (
                  <motion.div
                    key={index}
                    whileHover={date ? { scale: 1.02 } : {}}
                    onClick={() => date && setSelectedDate(date)}
                    className={`
                      h-24 p-2 border-b border-r border-gray-200/50 cursor-pointer transition-all duration-200
                      ${date ? "hover:bg-blue-50/50" : ""}
                      ${isToday(date) ? "bg-blue-100/50 border-blue-300" : ""}
                      ${
                        isSelected(date)
                          ? "bg-purple-100/50 border-purple-300"
                          : ""
                      }
                    `}
                  >
                    {date && (
                      <>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isToday(date)
                              ? "text-blue-600"
                              : isSelected(date)
                              ? "text-purple-600"
                              : "text-gray-700"
                          }`}
                        >
                          {date.getDate()}
                        </div>

                        {dayNotes.length > 0 && (
                          <div className="space-y-1">
                            {dayNotes.slice(0, 2).map((note) => (
                              <div
                                key={note.id}
                                className="text-xs p-1 bg-white/60 rounded border border-white/30 truncate"
                                title={note.title || "Untitled"}
                              >
                                {note.title || "Untitled"}
                              </div>
                            ))}
                            {dayNotes.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayNotes.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Details */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Notes for {selectedDate.toLocaleDateString()}
                </h3>

                {getNotesForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getNotesForDate(selectedDate).map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-white/60 rounded-2xl border border-white/30"
                      >
                        <h4 className="font-medium text-gray-800 mb-1">
                          {note.title || "Untitled"}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {note.content || "No content"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              note.color || "bg-blue-500"
                            }`}
                          />
                          <span className="text-xs text-gray-500">
                            {note.category || "Personal"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notes for this date</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
