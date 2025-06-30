// components/FeaturesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Code2, Github, Terminal, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Stack Matching",
      description:
        "Connect with developers who speak your programming language - literally!",
      gradient: "from-blue-400 to-purple-600",
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "Portfolio Showcase",
      description:
        "Let your commits do the talking. Share your best projects and contributions.",
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Code Chat",
      description:
        "Debug relationships with syntax highlighting and pair programming sessions.",
      gradient: "from-orange-400 to-red-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Interest Filters",
      description:
        "From AI to blockchain, find someone who shares your tech obsessions.",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Built for Developer Hearts
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every feature designed with the developer mindset in mind
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
