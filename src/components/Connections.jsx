import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/store/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

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

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleMessage = (userId) => {
    navigate(`/messages/${userId}`);
  };

  const filteredConnections = connections?.filter((connection) => {
    const fullName =
      `${connection.firstName} ${connection.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && connection.gender?.toLowerCase() === filter;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="flex flex-col items-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-base-content opacity-70">
                Loading your connections...
              </p>
            </div>
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
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
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
                <div>
                  <h3 className="font-bold">Something went wrong</h3>
                  <div className="text-xs">{error}</div>
                </div>
              </div>
            </div>
            <button onClick={fetchConnections} className="btn btn-primary mt-4">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!connections || connections.length === 0) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span className="text-3xl">?</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-4">No connections yet</h1>
            <p className="py-4">
              Start connecting with people to grow your network.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/explore")}
            >
              Find People
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state with connections
  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            My Connections
          </h2>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search connections..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-control flex-initial">
              <select
                className="select select-bordered w-full"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button onClick={fetchConnections} className="btn btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Refresh
            </button>
          </div>

          {/* Connection Stats */}
          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Total Connections</div>
              <div className="stat-value text-primary">
                {connections.length}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="stat-title">Filter Applied</div>
              <div className="stat-value text-secondary">
                {filter === "all"
                  ? "None"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
              <div className="stat-title">Filtered Results</div>
              <div className="stat-value">{filteredConnections.length}</div>
            </div>
          </div>

          {/* No results after filtering */}
          {filteredConnections.length === 0 && (
            <div className="alert alert-info shadow-lg mb-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>No connections match your search criteria.</span>
              </div>
            </div>
          )}

          {/* Connections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConnections.map((connection, index) => (
              <div
                key={connection._id || index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <figure className="px-5 pt-5">
                  <img
                    src={
                      connection?.imgURL ||
                      "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
                    }
                    alt={`${connection.firstName}'s profile`}
                    className="rounded-xl object-cover w-full h-48"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">
                    {connection.firstName} {connection.lastName}
                    {connection.gender && (
                      <div className="badge badge-accent">
                        {connection.gender}
                      </div>
                    )}
                  </h2>

                  {connection.age && (
                    <p className="text-sm">{connection.age} years old</p>
                  )}

                  <div className="divider my-1"></div>

                  <p className="text-sm line-clamp-3">
                    {connection.about || "No bio provided"}
                  </p>

                  {connection.skills && connection.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {connection.skills.slice(0, 3).map((skill, idx) => (
                        <div key={idx} className="badge badge-outline">
                          {skill}
                        </div>
                      ))}
                      {connection.skills.length > 3 && (
                        <div className="badge badge-outline">
                          +{connection.skills.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="card-actions justify-between mt-4">
                    <button
                      className="btn btn-outline btn-info btn-sm"
                      onClick={() => handleViewProfile(connection._id)}
                    >
                      Profile
                    </button>
                    <button
                      className="btn btn-outline btn-success btn-sm"
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
      </div>
    </div>
  );
};

export default Connections;
