// components/FloatingCodeElements.jsx
import React from "react";
import { motion } from "framer-motion";

const FloatingCodeElements = () => {
  const codeSymbols = ["{ }", "< />", "( )", "[ ]", "/**/"];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-600 text-sm font-mono opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {codeSymbols[Math.floor(Math.random() * codeSymbols.length)]}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCodeElements;
