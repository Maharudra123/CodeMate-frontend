import React from "react";
import Logo from "/footer1.png"; // Replace with your correct logo path

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-10 px-6 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        {/* Logo */}
        <img
          src={Logo}
          alt="CodeMate Logo"
          className="w-64 h-44 drop-shadow-xl transition-transform duration-300 hover:scale-105"
        />

        {/* Tagline */}
        <p className="text-sm text-purple-400 italic tracking-wide">
          CodeMate — Where Logic Meets Connection
        </p>

        {/* Optional Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <a href="#" className="hover:text-purple-300 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Support
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} CodeMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
