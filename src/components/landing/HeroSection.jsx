// components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingCodeElements from "./FloatingCodeElements";
import InteractiveTerminal from "./InteractiveTerminal";
import StatsGrid from "./StatsGrid";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTerminalVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <FloatingCodeElements />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-purple-400 font-mono text-lg font-medium">
                👨‍💻 Built for Coders, by a Coder
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              CodeMate
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Where algorithms meet hearts. Connect with fellow developers who
              understand your passion for clean code and late-night debugging
              sessions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Coding Love
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-purple-500 rounded-lg font-semibold text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                View Features
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {isTerminalVisible ? (
              <InteractiveTerminal key="terminal" />
            ) : (
              <StatsGrid key="stats" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
