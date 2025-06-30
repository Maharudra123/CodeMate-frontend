// components/FeatureCard.jsx
import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      ></div>

      <div
        className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-6`}
      >
        {feature.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
        {feature.title}
      </h3>

      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;
