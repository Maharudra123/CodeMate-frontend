import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      setError(error.response?.data?.message || "Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-5 flex flex-col items-center justify-center min-h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading requests...</p>
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
            onClick={fetchRequest}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!requests || requests.length === 0) {
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">
            No requests found
          </h1>
          <p className="text-gray-500 mt-2">
            You don't have any connection requests at the moment.
          </p>
        </div>
      </div>
    );
  }

  // Success state with requests
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Connection Requests
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request, index) => {
          // Destructure fromUserId properties
          const { firstName, lastName, age, gender, about, imgURL, _id } =
            request?.fromUserId || {};

          return (
            <div
              key={_id || index}
              className="bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={imgURL || "https://via.placeholder.com/100"}
                    alt={`${firstName || "User"}'s profile`}
                    className="w-16 h-16 rounded-full border-2 border-blue-100 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {firstName && lastName
                        ? `${firstName} ${lastName}`
                        : "Unknown User"}
                    </h3>
                    <p className="text-sm text-white">
                      {age && gender
                        ? `${age} years old, ${gender}`
                        : "No details available"}
                    </p>
                  </div>
                </div>

                <div className="bg-base-100 p-3 rounded-md mb-4">
                  <p
                    className="text-white
                   text-sm"
                  >
                    {about || "No introduction provided"}
                  </p>
                </div>

                <div className="flex gap-2 justify-between">
                  <button
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => handleAccept(_id)}
                  >
                    Accept
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => handleDecline(_id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to handle accepting a request (to be implemented)
const handleAccept = (userId) => {
  console.log("Accept request from user:", userId);
  // Implement the accept logic here
};

// Helper function to handle declining a request (to be implemented)
const handleDecline = (userId) => {
  console.log("Decline request from user:", userId);
  // Implement the decline logic here
};

export default Requests;
