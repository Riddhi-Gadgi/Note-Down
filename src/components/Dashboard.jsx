import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Notes from "./Notes/Notes";
import Categories from "./Categories/Categories";
import Calendar from "./Calendar/Calendar";
import Profile from "./Profile/Profile";

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="notes" replace />} />
          <Route
            path="notes"
            element={<Notes sidebarCollapsed={collapsed} />}
          />
          <Route path="categories" element={<Categories />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
