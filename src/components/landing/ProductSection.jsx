import { motion } from "framer-motion";
import { FileText, Calendar, FolderOpen, Search, Zap } from "lucide-react";

const ProductSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart Notes",
      description:
        "Create rich, formatted notes with images, links, and tags. Google Keep style interface for quick capture.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Calendar,
      title: "Calendar View",
      description:
        "See your notes organized by date. Never lose track of when you captured that important idea.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: FolderOpen,
      title: "Categories",
      description:
        "Organize notes with custom categories and colors. Keep everything structured and findable.",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Find any note instantly with our advanced search. Search by content, tags, or categories.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed. Create, edit, and find notes in milliseconds. No waiting, just productivity.",
      gradient: "from-yellow-500 to-orange-400",
    },
  ];

  return (
    <section
      id="product"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Every Need
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From simple notes to organized planning, Note Down provides all the
            tools you need to capture, structure, and connect your ideas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* First 3 features */}
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full">
                <div
                  className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-3 inline-flex items-center justify-center shadow-md`}
                >
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Last 2 features centered */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center gap-10">
            {features.slice(3).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                viewport={{ once: true }}
                className="flex max-w-sm"
              >
                <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full">
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-3 inline-flex items-center justify-center shadow-md`}
                  >
                    <feature.icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
