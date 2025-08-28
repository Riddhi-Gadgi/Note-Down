import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Calendar,
  FolderOpen,
  Search,
  Zap,
} from "lucide-react";

const ProductSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart Notes",
      description:
        "Create rich, formatted notes with images, links, and tags. Google Keep style interface for quick capture.",
      color: "bg-blue-500",
    },
    {
      icon: Brain,
      title: "Mind Maps",
      description:
        "Visualize your ideas with interactive mind maps. Connect thoughts and see the bigger picture.",
      color: "bg-purple-500",
    },
    {
      icon: Calendar,
      title: "Calendar View",
      description:
        "See your notes organized by date. Never lose track of when you captured that important idea.",
      color: "bg-green-500",
    },
    {
      icon: FolderOpen,
      title: "Categories",
      description:
        "Organize notes with custom categories and colors. Keep everything structured and findable.",
      color: "bg-orange-500",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Find any note instantly with our advanced search. Search by content, tags, or categories.",
      color: "bg-red-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed. Create, edit, and find notes in milliseconds. No waiting, just productivity.",
      color: "bg-yellow-500",
    },
  ];

  return (
    <section id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple notes to complex mind maps, Note Down provides all the
            tools you need to capture, organize, and connect your ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div
                className={`bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow   duration-300 h-full w-full hover:bg-white `}
              >
                <div
                  className={`${feature.color} rounded-full p-3 inline-block`}
                >
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
