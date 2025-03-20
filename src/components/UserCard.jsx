import React from "react";
import { Heart, X } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/store/feedSlice";
import { BASE_URL } from "../utils/contants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, imgURL, skills, about, age, gender } =
    user || {};

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="px-5 pt-5">
        <img
          src={
            imgURL ||
            "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
          }
          alt={`${firstName || "User"} ${lastName || ""}`}
          className="rounded-lg w-full h-full object-cover"
        />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl font-bold">
          {firstName || "Death"} {lastName || ""}
        </h2>

        <span className="badge badge-neutral">
          {age ? `${age} years old, ${gender}` : "Imortal"}
        </span>

        <p className="text-white text-lg overflow-ellipsis">
          {about ||
            "Last user of your feed, stop scrolling otherwise he'll grab you"}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-2">
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
            <span className="text-gray-500">No skills listed</span>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className="btn btn-outline btn-success"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <Heart size={16} className="mr-1" /> Interested
          </button>
          <button
            className="btn btn-outline btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <X size={16} className="mr-1" /> Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
