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
        "Collaborate seamlessly with your team members. Share notes, create group mind maps, and stay synchronized.",
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
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions for
            <span className="bg-gradient-to-r  from-sky-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a student, professional, or enterprise, we have the
            perfect solution tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <solution.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {solution.description}
              </p>

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
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which solution is right for you?
          </h3>
          <p className="text-gray-600 mb-8">
            Contact our team for a personalized consultation and find the
            perfect plan for your needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
