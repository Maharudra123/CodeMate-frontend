import React, { useState } from "react";
import { Heart, LucideVerified, VerifiedIcon, X } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/store/feedSlice";
import { BASE_URL } from "../utils/contants";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { toast } from "react-toastify";
import { Verified } from "lucide-react";

const UserCard = ({ user, index, isTop }) => {
  const {
    _id,
    firstName,
    lastName,
    imgURL,
    skills,
    about,
    age,
    gender,
    isPremium,
  } = user || {};

  const dispatch = useDispatch();
  const [swipeDirection, setSwipeDirection] = useState(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  const leftIndicatorOpacity = useTransform(x, [-100, -10], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [10, 100], [0, 1]);

  const handleSendRequest = async (status, userId) => {
    try {
      setSwipeDirection(status === "interested" ? "right" : "left");

      await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (status === "interested") {
        toast.success("Request sent successfully!");
      } else {
        toast.info("Profile skipped!");
      }

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
      setSwipeDirection(null);
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      handleSendRequest("interested", _id);
    } else if (info.offset.x < -100) {
      handleSendRequest("ignored", _id);
    }
  };

  if (!isTop) {
    return null;
  }

  return (
    <motion.div
      className="w-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl shadow-2xl transition-all duration-300 absolute left-0 right-0 mx-auto cursor-grab overflow-hidden"
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x:
          swipeDirection === "left"
            ? -500
            : swipeDirection === "right"
            ? 500
            : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        zIndex: 100 - index,
        transform: `scale(${1 - index * 0.03}) translateY(${index * 8}px)`,
        x,
        rotate,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      onDragEnd={handleDragEnd}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
    >
      {/* Swipe Indicators */}
      <div className="absolute inset-0 z-10 flex justify-between items-center pointer-events-none">
        <motion.div
          className="ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-full shadow-lg"
          style={{ opacity: leftIndicatorOpacity }}
        >
          <X size={24} />
        </motion.div>
        <motion.div
          className="mr-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-lg"
          style={{ opacity: rightIndicatorOpacity }}
        >
          <Heart size={24} />
        </motion.div>
      </div>

      {/* Profile Image Section */}
      <div className="relative overflow-hidden">
        <figure className="p-0">
          <img
            src={
              imgURL ||
              "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
            }
            alt={`${firstName || "User"} ${lastName || ""}`}
            className="w-full h-80 object-cover"
            draggable="false"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {firstName || "User"} {lastName || ""}
              </h2>
              {age && (
                <span className="text-lg font-medium text-gray-200">{age}</span>
              )}
              {isPremium && (
                <LucideVerified
                  size={22}
                  className="fill-blue-400 text-blue-400 drop-shadow-md"
                />
              )}
            </div>
            {gender && (
              <p className="text-sm text-gray-300 capitalize font-medium">
                {gender}
              </p>
            )}
          </div>
        </figure>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* About Section */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm leading-relaxed max-h-20 overflow-y-auto custom-scrollbar">
            {about || "Hey there, I am using CodeMate!!!"}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto custom-scrollbar">
            {skills?.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm italic">
                No skills listed
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 shadow-lg backdrop-blur-sm border border-red-400/20"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <X size={20} className="mx-auto" />
          </button>
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-500 hover:to-green-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-lg backdrop-blur-sm border border-green-400/20"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <Heart size={20} className="mx-auto" />
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default UserCard;
