import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";

const GoPremium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremium = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    verifyPremium();
  }, []);

  const handleBuyMembership = async (membershipType) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType,
      },
      { withCredentials: true }
    );
    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "CodeMate",
      description: "Premium Developer Membership",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#A855F7",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Premium Active
        </h1>
        <p className="text-xl text-gray-400">
          You're already enjoying premium developer connections
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Upgrade Your Code
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Where premium algorithms meet developer hearts. Choose your
            membership.
          </p>
          {/* <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full">
            <svg
              className="w-5 h-5 mr-2 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-purple-400 font-semibold">
              Unlock Premium Features
            </span>
          </div> */}
        </div>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Silver Membership Card */}
          <div className="group bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 relative">
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
                <span className="text-purple-400 text-sm font-medium">
                  Popular
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Silver Membership
              </h2>
              <div className="text-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ₹300
                </span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-400"
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
                  </div>
                  <span className="text-gray-300">
                    Chat with fellow developers
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-400"
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
                  </div>
                  <span className="text-gray-300">
                    100 connection requests per day
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-400"
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
                  </div>
                  <span className="text-gray-300">
                    Verified developer badge
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-400"
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
                  </div>
                  <span className="text-gray-300">3 months premium access</span>
                </li>
              </ul>
            </div>

            <button
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleBuyMembership("silver")}
            >
              Get Silver Membership
            </button>
          </div>

          {/* Gold Membership Card */}
          <div className="group bg-gray-800/50 border-2 border-yellow-500/50 rounded-xl p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 rounded-full">
                <span className="text-black text-sm font-bold">Best Value</span>
              </div>
            </div>

            <div className="mb-6 mt-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Gold Membership
              </h2>
              <div className="text-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ₹500
                </span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6 mb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-yellow-400"
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
                  </div>
                  <span className="text-gray-300">
                    Chat with fellow developers
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-yellow-400"
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
                  </div>
                  <span className="text-gray-300">
                    <span className="font-bold text-yellow-400">Unlimited</span>{" "}
                    connection requests
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-yellow-400"
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
                  </div>
                  <span className="text-gray-300">
                    Verified developer badge
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-yellow-400"
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
                  </div>
                  <span className="text-gray-300">6 months premium access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-yellow-400"
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
                  </div>
                  <span className="text-gray-300">
                    Priority developer support
                  </span>
                </li>
              </ul>
            </div>

            <button
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleBuyMembership("gold")}
            >
              Get Gold Membership
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-4">
              All plans come with a 7-day money-back guarantee
            </p>
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
              Learn more about our premium features →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoPremium;
