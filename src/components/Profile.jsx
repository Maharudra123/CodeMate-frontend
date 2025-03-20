import React from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center">
      <UpdateProfile user={user} />
    </div>
  );
};

export default Profile;
