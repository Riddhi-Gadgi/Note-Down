import { motion } from "framer-motion";
import {
  Users,
  Building,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "For Teams",
      description:
        "Collaborate seamlessly with your team members. Share notes, organize projects, and stay synchronized.",
      features: [
        "Real-time collaboration",
        "Team workspaces",
        "Permission controls",
        "Activity tracking",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Building,
      title: "For Enterprises",
      description:
        "Scale your organization's knowledge management with enterprise-grade security and admin controls.",
      features: [
        "SSO integration",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      title: "For Education",
      description:
        "Perfect for students and educators. Take lecture notes, create study guides, and organize research.",
      features: [
        "Student discounts",
        "Classroom management",
        "Assignment tracking",
        "Study templates",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Briefcase,
      title: "For Professionals",
      description:
        "Boost your productivity with professional note-taking tools designed for busy professionals.",
      features: [
        "Meeting templates",
        "Client management",
        "Project organization",
        "Time tracking",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="solutions"
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
            Solutions for
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Everyone
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a student, professional, or enterprise, we have the
            perfect solution tailored to your needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}
              >
                <solution.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title + Desc */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {solution.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + featureIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="bg-green-100 rounded-full p-1 mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-14 rounded-2xl shadow-lg"
        >
          <h3 className="text-3xl font-bold mb-4">
            Not sure which solution is right for you?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact our team for a personalized consultation and find the
            perfect plan for your needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-medium shadow-md hover:bg-gray-100 transition-colors"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
