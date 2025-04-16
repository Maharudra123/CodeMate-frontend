import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="relative  h-screen flex flex-col my-10 gap-4">
      {feed && feed.length > 0 ? (
        feed.map((user, index) => (
          <UserCard
            user={user}
            key={user._id}
            index={index}
            isTop={index === 0}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold">No users available</h1>
        </div>
      )}
    </div>
  );
};

export default Feed;
