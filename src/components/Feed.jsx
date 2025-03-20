import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";
import UserCard from "./UserCard";

const Feed = () => {
  const [user, setUser] = useState(null);

  const getFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {user ? <UserCard user={user[0]} /> : <p>Loading...</p>}
    </div>
  );
};

export default Feed;
