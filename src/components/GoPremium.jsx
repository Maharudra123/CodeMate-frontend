import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";

const GoPremium = () => {
  const verifyPayment = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });
    console.log(res.data);
  };
  useEffect(() => {
    verifyPayment();
  });
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
      key: keyId, // Enter the Key ID generated from the Dashboard,
      amount,
      currency,
      name: "TinderForGeeks",
      description: "Test Transaction",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose Your Membership
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Silver Membership Card */}
        <div className="card bg-base-200 shadow-xl flex-1 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl">Silver Membership</h2>
              <div className="badge badge-secondary text-lg p-3">Popular</div>
            </div>

            <div className="my-4">
              <span className="text-3xl font-bold">₹300</span>
              <span className="text-sm opacity-70">/month</span>
            </div>

            <div className="divider my-2"></div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Chat with members
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                100 connection requests per day
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Verified profile badge
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                3 months access
              </li>
            </ul>

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary btn-block"
                onClick={() => handleBuyMembership("silver")}
              >
                Get Silver
              </button>
            </div>
          </div>
        </div>

        {/* Gold Membership Card */}
        <div className="card bg-base-200 shadow-xl flex-1 border-2 border-warning hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-4 right-4 bg-warning text-warning-content px-4 py-1 rounded-lg font-bold">
            Best Value
          </div>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-2xl text-warning">
                Gold Membership
              </h2>
              <div className="badge badge-warning text-lg p-3">Premium</div>
            </div>

            <div className="my-4">
              <span className="text-3xl font-bold">₹500</span>
              <span className="text-sm opacity-70">/month</span>
            </div>

            <div className="divider my-2"></div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Chat with members
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-bold">Unlimited </span>{" "}
                <span> connection requests </span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Verified profile badge
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                6 months access
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority support
              </li>
            </ul>

            <div className="card-actions justify-center">
              <button
                className="btn btn-warning btn-block"
                onClick={() => handleBuyMembership("silver")}
              >
                Get Gold
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 opacity-70">
        <p>All plans come with a 7-day money-back guarantee</p>
        <button className="btn btn-link btn-sm">
          Learn more about our plans
        </button>
      </div>
    </div>
  );
};

export default GoPremium;
