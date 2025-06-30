// components/HowItWorksSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import WorkflowStep from "./WorkflowStep";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Build Your Developer Profile",
      description:
        "Showcase your skills, projects, and what makes you unique as a developer",
    },
    {
      step: "02",
      title: "Match by Tech Stack & Interests",
      description:
        "Our algorithm connects you with developers who share your passion and expertise",
    },
    {
      step: "03",
      title: "Code, Chat, Connect",
      description:
        "Start conversations that matter - from debugging life to planning your next startup",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            <Code2 className="inline-block w-10 h-10 mr-4 text-purple-400" />
            How It Works
          </h2>
        </motion.div>

        <div className="space-y-12">
          {steps.map((item, index) => (
            <WorkflowStep key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
