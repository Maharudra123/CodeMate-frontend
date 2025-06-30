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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col py-10 px-4">
      <div className="max-w-4xl mx-auto w-full">
        {feed && feed.length > 0 ? (
          <div className="space-y-6">
            {feed.map((user, index) => (
              <UserCard
                user={user}
                key={user._id}
                index={index}
                isTop={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                No Developers Found
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Looks like all the developers are busy coding! Check back soon
                for new connections.
              </p>
              <div className="mt-6">
                {/* <button
                  onClick={getFeed}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Refresh Feed
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
