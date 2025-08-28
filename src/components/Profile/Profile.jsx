import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Camera,
  Save,
  X,
  FileText,
  FolderOpen,
  Clock,
  Star,
} from "lucide-react";
import { updateProfile } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);
  const { categories } = useSelector((state) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    });
    setIsEditing(false);
  };

  const stats = [
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Total Notes",
      value: notes.length,
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      label: "Categories",
      value: categories.length,
      color: "from-rose-400 to-red-400",
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: "Pinned Notes",
      value: notes.filter((note) => note.isPinned).length,
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Days Active",
      value: Math.floor(
        (Date.now() - new Date("2024-01-01").getTime()) / (1000 * 60 * 60 * 24)
      ),
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 p-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black ">Profile</h1>
              <p className="text-gray-500 mt-1">
                Manage your account and preferences
              </p>
            </div>

            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-black text-white rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-4 py-2 bg-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 bg-white/80 backdrop-blur-sm transition-all duration-300"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">
                          {user?.name || "Not set"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 bg-white/80 backdrop-blur-sm transition-all duration-300"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Your location"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 bg-white/80 backdrop-blur-sm transition-all duration-300"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">
                          {user?.location || "Not set"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-2xl min-h-[100px]">
                      <p className="text-gray-900">
                        {user?.bio || "No bio added yet."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {notes.slice(0, 5).map((note, index) => (
                <div
                  key={note.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl"
                >
                  <div
                    className={`w-10 h-10 ${note.color} rounded-xl flex items-center justify-center shadow-sm`}
                  >
                    <FileText className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {note.title || "Untitled"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Updated {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {note.isPinned && (
                    <Star className="w-5 h-5 text-orange-400 fill-current" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
