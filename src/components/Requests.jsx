import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/store/requestSlice";
import { toast } from "react-toastify";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, _id) => {
    setActiveRequest(_id);
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      toast.success(`Request ${status} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process request");
    } finally {
      setActiveRequest(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <h3 className="mt-6 text-xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Loading Connection Requests
          </h3>
          <p className="mt-2 text-gray-400">
            Fetching your developer connections...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-2">
              Connection Error
            </h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchRequests}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              No Connection Requests
            </h2>
            <p className="text-gray-400 mb-6">
              You don't have any pending connection requests at the moment.
              Start exploring and connecting with fellow developers!
            </p>
            <a
              href=""
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Explore Developers
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Display requests
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Connection Requests
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Where algorithms meet hearts. Review your coding connections.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-400 font-semibold">
              {requests.length} {requests.length === 1 ? "Request" : "Requests"}{" "}
              Pending
            </span>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request) => {
            const { firstName, lastName, age, gender, about, imgURL, _id } =
              request?.fromUserId || {};

            const isProcessing = activeRequest === request._id;

            return (
              <div
                key={_id || request._id}
                className="group bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/50 ring-offset-2 ring-offset-gray-900">
                      <img
                        src={imgURL || "https://via.placeholder.com/100"}
                        alt={`${firstName || "User"}'s profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=👨‍💻";
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {firstName && lastName
                        ? `${firstName} ${lastName}`
                        : "Fellow Developer"}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {age && gender
                        ? `${age} years • ${gender}`
                        : "Profile details private"}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 min-h-[80px]">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {about ||
                        "This developer prefers to let their code do the talking. 💻"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isProcessing
                        ? "bg-gray-600 cursor-not-allowed text-gray-400"
                        : "bg-gray-700/50 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-gray-600 hover:border-red-500/50"
                    }`}
                    onClick={() => reviewRequest("rejected", request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Decline
                      </span>
                    )}
                  </button>
                  <button
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isProcessing
                        ? "bg-gray-600 cursor-not-allowed text-gray-400"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105"
                    }`}
                    onClick={() => reviewRequest("accepted", request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Accept
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
