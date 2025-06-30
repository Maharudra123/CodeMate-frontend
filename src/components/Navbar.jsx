import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { removeUser } from "../utils/store/userSlice";
import Logoo from "/codemate.png";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
      setIsMobileMenuOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0b0c1a] border-b border-[#2a2b3c] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Logo */}
          <Link
            to={user ? "/" : "/landing"}
            className="flex items-center gap-2"
          >
            <img src={Logoo} alt="CodeMate Logo" className="h-10" />
            <span className="text-2xl font-bold text-pink-400">CodeMate</span>
          </Link>

          {/* Desktop Navigation */}
          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex gap-4">
                  <Link
                    to="/profile"
                    className="text-white hover:text-pink-400 transition"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/connections"
                    className="text-white hover:text-pink-400 transition"
                  >
                    Connections
                  </Link>
                  <Link
                    to="/requests"
                    className="text-white hover:text-pink-400 transition"
                  >
                    Requests
                  </Link>
                  <Link
                    to="/gopremium"
                    className="text-white hover:text-yellow-300 transition"
                  >
                    Go Premium
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={user.imgURL}
                    alt="avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-pink-500"
                  />
                  <span className="text-sm text-purple-300 whitespace-nowrap">
                    Hi, {user.firstName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white p-2"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1.5" : "mb-1"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "mb-1"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Start Coding Love
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {user && (
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 pb-2 border-t border-[#2a2b3c] mt-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4 px-2">
                <img
                  src={user.imgURL}
                  alt="avatar"
                  className="w-10 h-10 rounded-full ring-2 ring-pink-500"
                />
                <span className="text-sm text-purple-300">
                  Hi, {user.firstName}
                </span>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col space-y-2">
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-pink-400 transition px-2 py-2 rounded hover:bg-[#1a1b2e]"
                >
                  Profile
                </Link>
                <Link
                  to="/connections"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-pink-400 transition px-2 py-2 rounded hover:bg-[#1a1b2e]"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-pink-400 transition px-2 py-2 rounded hover:bg-[#1a1b2e]"
                >
                  Requests
                </Link>
                <Link
                  to="/gopremium"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-yellow-300 transition px-2 py-2 rounded hover:bg-[#1a1b2e]"
                >
                  Go Premium
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition mx-2 mt-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
