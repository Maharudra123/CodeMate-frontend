// LoginComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const [emailId, setEmailId] = useState("dimplemathe@gmail.com");
  const [password, setPassword] = useState("dimpleYash@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Email Field */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </label>

          {/* Password Field */}
          <label className="form-control w-full mt-3">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <p className="text-error">ERROR: {error}</p>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mt-3">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full mt-4" onClick={handleLogin}>
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center mt-3">
            Don’t have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
