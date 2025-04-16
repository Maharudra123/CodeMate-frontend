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

  // const fetchRequests = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     // Fixed typo in endpoint: "recived" -> "received"
  //     const res = await axios.get(BASE_URL + "/user/requests/received", {
  //       withCredentials: true,
  //     });
  //     dispatch(addRequest(res?.data?.data));
  //   } catch (error) {
  //     console.error("Failed to fetch requests:", error);
  //     setError(error.response?.data?.message || "Failed to load requests");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="py-4 text-base-content">
              Loading your connection requests...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button onClick={fetchRequests} className="btn btn-error mt-4">
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-24">
                    <span className="text-3xl">?</span>
                  </div>
                </div>
                <h2 className="card-title">No Connection Requests</h2>
                <p>
                  You don't have any pending connection requests at the moment.
                </p>
                <div className="card-actions justify-center mt-4">
                  <a href="/explore" className="btn btn-primary">
                    Explore People
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display requests
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Connection Requests</h2>
        <div className="badge badge-primary badge-lg mt-2 py-2 px-4">
          {requests.length} {requests.length === 1 ? "Request" : "Requests"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => {
          const { firstName, lastName, age, gender, about, imgURL, _id } =
            request?.fromUserId || {};

          const isProcessing = activeRequest === request._id;

          return (
            <div
              key={_id || request._id}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={imgURL || "https://via.placeholder.com/100"}
                        alt={`${firstName || "User"}'s profile`}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=User";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title">
                      {firstName && lastName
                        ? `${firstName} ${lastName}`
                        : "Unknown User"}
                    </h2>
                    <div className="badge badge-outline">
                      {age && gender
                        ? `${age} years old, ${gender}`
                        : "No details"}
                    </div>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="bg-base-200 p-4 rounded-box mb-4 min-h-16">
                  <p className="text-sm">
                    {about || "No introduction provided"}
                  </p>
                </div>

                <div className="card-actions justify-end">
                  <button
                    className={`btn ${
                      isProcessing ? "btn-disabled" : "btn-outline"
                    }`}
                    onClick={() => reviewRequest("rejected", request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Decline"
                    )}
                  </button>
                  <button
                    className={`btn ${
                      isProcessing ? "btn-disabled" : "btn-primary"
                    }`}
                    onClick={() => reviewRequest("accepted", request._id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Accept"
                    )}
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

export default Requests;
