import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
      setError(error.response?.data?.message || "Failed to load connections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-5 flex flex-col items-center justify-center min-h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading your connections...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-5 text-center">
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchConnections}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!connections || connections.length === 0) {
    return (
      <div className="container mx-auto p-5 text-center">
        <div className="bg-gray-50 p-10 rounded-lg shadow-md">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">
            No connections yet
          </h1>
          <p className="text-gray-500 mt-2">
            Start connecting with people to grow your network.
          </p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => (window.location.href = "/explore")}
          >
            Find People
          </button>
        </div>
      </div>
    );
  }

  // Success state with connections
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        My Connections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {connections.map((connection, index) => (
          <div
            key={connection._id || index}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={
                  connection?.imgURL || "https://via.placeholder.com/300x200"
                }
                alt={`${connection.firstName}'s profile`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {connection.age ? `${connection.age} years old` : ""}
                {connection.gender ? `, ${connection.gender}` : ""}
              </p>

              <div className="h-20 overflow-hidden">
                <p className="text-gray-700 text-sm">
                  {connection.about || "No bio provided"}
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm"
                  onClick={() => handleViewProfile(connection._id)}
                >
                  View Profile
                </button>
                <button
                  className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors text-sm"
                  onClick={() => handleMessage(connection._id)}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to handle viewing a profile (to be implemented)
const handleViewProfile = (userId) => {
  console.log("View profile:", userId);
  // Navigate to profile page
  // window.location.href = `/profile/${userId}`;
};

// Helper function to handle messaging a connection (to be implemented)
const handleMessage = (userId) => {
  console.log("Message user:", userId);
  // Navigate to message page or open message modal
  // window.location.href = `/messages/${userId}`;
};

export default Connections;
