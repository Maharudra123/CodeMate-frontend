import React from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header Section */}
      <div className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Developer Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your coding journey and connections
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 flex justify-center items-start px-4 pb-8">
        <div className="w-full max-w-4xl">
          {user ? (
            <UpdateProfile user={user} />
          ) : (
            <div className="flex justify-center items-center min-h-[50vh]">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Loading Profile...
                </h2>
                <p className="text-gray-400">
                  Setting up your developer workspace
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gradient-to-r from-purple-400 to-pink-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
