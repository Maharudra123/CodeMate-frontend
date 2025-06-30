// components/InteractiveTerminal.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const InteractiveTerminal = () => {
  const [currentCode, setCurrentCode] = useState(0);

  const codeSnippets = [
    "const love = developer => heart;",
    "if (compatible) { connect(); }",
    "function findMatch() { return soulmate; }",
    "git commit -m 'Found my pair programmer'",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
    >
      <div className="flex items-center space-x-2 bg-gray-700 px-4 py-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-300 text-sm ml-4">terminal</span>
      </div>
      <div className="p-6 font-mono text-sm">
        <div className="text-green-400 mb-2">$ npm install love</div>
        <div className="text-gray-300 mb-4">
          Installing dependencies for better relationships...
        </div>

        <motion.div
          key={currentCode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-purple-400 mb-2"
        >
          {codeSnippets[currentCode]}
        </motion.div>

        <div className="text-green-400">✓ Connection established</div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
