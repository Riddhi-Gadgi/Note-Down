import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #d1d5db 0 1px, transparent 1px 40px),
            repeating-linear-gradient(90deg, #d1d5db 0 1px, transparent 1px 40px)
          `,
          backgroundSize: "40px 40px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold  text-gray-900 mb-6 leading-tight">
            Everything you want to{" "}
            <span className="bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
              Note
            </span>
            <br />
            All-in-one{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Down
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Capture ideas, organize thoughts, and collaborate seamlessly with
            our powerful note-taking platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/dashboard"
              className="group bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              Explore the Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            <div>
              <div className="text-3xl bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent font-bold">1M+</div>
              <div className="text-gray-600">Notes Created</div>
            </div>
            <div>
              <div className="text-3xl bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent font-bold">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;