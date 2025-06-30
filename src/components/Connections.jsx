import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnection } from "../utils/store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">💻💔</div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            No Connections Found
          </h1>
          <p className="text-gray-400 text-lg">
            Start connecting with fellow developers to build your network!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🤝</span>
          <span className="text-lg text-purple-400 font-semibold">
            Built for Coders, by a Coder
          </span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Your Connections
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Where algorithms meet hearts. Your network of fellow developers who
          understand your passion for clean code.
        </p>
      </div>

      {/* Connections Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, imgURL, gender, about, age } =
              connection.user;

            return (
              <div
                key={_id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
              >
                {/* User Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img
                      src={imgURL}
                      alt="user"
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-purple-300 mb-2">
                    {age && `${age} years old`} {age && gender && "•"} {gender}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {about ||
                      "A passionate developer ready to connect and collaborate."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link to={`/chat/${_id}`} className="flex-1">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                      💬 Chat
                    </button>
                  </Link>
                  <button className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white p-3 rounded-xl transition-all duration-300 hover:scale-105">
                    👤
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection Stats */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {connections.length}
            </div>
            <p className="text-gray-400">
              {connections.length === 1 ? "Connection" : "Connections"} in your
              network
            </p>
            <p className="text-sm text-purple-300 mt-2">
              Keep growing your developer community! 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
