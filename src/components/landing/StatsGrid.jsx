// components/StatsGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Star, Coffee } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    {
      label: "Active Developers",
      value: "25K+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Successful Matches",
      value: "3.2K",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      label: "Code Reviews",
      value: "15K+",
      icon: <Star className="w-6 h-6" />,
    },
    {
      label: "Coffee Dates",
      value: "8.7K",
      icon: <Coffee className="w-6 h-6" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-2 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
        >
          <div className="text-purple-400 mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
