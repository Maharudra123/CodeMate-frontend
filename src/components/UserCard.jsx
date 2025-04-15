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
  console.log("user", user);
  console.log("isPremium", isPremium);

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
      className="card w-76  bg-base-100 transition-all duration-300 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] border border-dotted absolute left-0 right-0 mx-auto cursor-grab"
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
      <div className="absolute inset-0 z-10 flex justify-between items-center pointer-events-none">
        <motion.div
          className="ml-4 bg-red-500 text-white p-3 rounded-full"
          style={{ opacity: leftIndicatorOpacity }}
        >
          <X size={24} />
        </motion.div>
        <motion.div
          className="mr-4 bg-green-500 text-white p-3 rounded-full"
          style={{ opacity: rightIndicatorOpacity }}
        >
          <Heart size={24} />
        </motion.div>
      </div>

      <div className="relative overflow-hidden rounded-t-lg">
        <figure className="px-0 pt-0">
          <img
            src={
              imgURL ||
              "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
            }
            alt={`${firstName || "User"} ${lastName || ""}`}
            className="w-96 h-96 object-cover"
            draggable="false"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-3 left-3 text-white">
            <h2 className="text-xl font-bold mb-0">
              {firstName || "User"} {lastName || ""}{" "}
              <span className="ml-2 font-normal text-base">
                {age ? age : ""}
              </span>
              {isPremium ? (
                <LucideVerified
                  size={20}
                  className="inline-block ml-1 fill-blue-500"
                />
              ) : (
                ""
              )}
            </h2>
            {gender && <p className="text-sm opacity-80">{gender}</p>}
          </div>
        </figure>
      </div>

      <div className="card-body p-4">
        <p className="text-base mb-3 max-h-24 overflow-y-auto">
          {about || "Hey there, I am using devTinder!!!"}
        </p>

        <div className="flex flex-wrap gap-2 justify-start mb-4 max-h-16 overflow-y-auto">
          {skills?.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary badge-outline px-3 py-1"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No skills listed</span>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <button
            className="btn  btn-error shadow-md flex-1"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <X size={20} />
          </button>
          <button
            className="btn  btn-success shadow-md flex-1"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
