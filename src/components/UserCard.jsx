import React from "react";
import { Heart, X, Coffee } from "lucide-react";

const UserCard = ({ user }) => {
  const { firstName, lastName, imgURL, skills, about, age, gender } =
    user || {};
  console.log(firstName, lastName, imgURL, skills, about, age, gender);

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
          {firstName || "Unknown"} {lastName || ""}
        </h2>

        <span className="badge badge-neutral">
          {age} years old, {gender}
        </span>

        <p className="text-white text-lg overflow-ellipsis">{about}</p>

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
          <button className="btn btn-outline btn-success">
            <Heart size={16} className="mr-1" /> Interested
          </button>
          <button className="btn btn-outline btn-error">
            <X size={16} className="mr-1" /> Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
