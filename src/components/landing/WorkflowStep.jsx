// components/WorkflowStep.jsx
import React from "react";
import { motion } from "framer-motion";

const WorkflowStep = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="flex items-center space-x-8"
    >
      <div className="text-6xl font-mono font-bold text-purple-400 opacity-50">
        {item.step}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-gray-300 text-lg">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default WorkflowStep;
