import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PencilLine,
  FileText,
  FolderOpen,
  Calendar,
  Brain,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { logout } from "../store/authSlice";

const links = [
  { to: "/notes", label: "Notes", icon: FileText },
  { to: "/categories", label: "Categories", icon: FolderOpen },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col bg-white/80 backdrop-blur-xl border-r border-white/30 shadow-xl"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      {/* Header */}
      <div className="flex items-center p-6 border-b border-white/30">
        <div className="flex items-center justify-center w-10 h-10 bg-black rounded-xl shadow-lg">
          <PencilLine className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-3"
          >
            <h1 className="text-xl font-bold text-black">Note Down</h1>
            <p className="text-sm text-gray-500">
              Welcome, {user?.name || "User"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/dashboard${to}`}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden
              ${
                isActive
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-white/80 hover:text-gray-900 hover:shadow-md"
              }
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <Icon
              className={`${collapsed ? "w-6 h-6" : "w-5 h-5"} flex-shrink-0`}
            />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-medium"
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/30">
        {/* Logout Button */}
        {!collapsed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 mb-4 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </motion.button>
        )}

        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all duration-300"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
