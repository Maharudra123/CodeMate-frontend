import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.error("Error fetching user:", error);
      if (location.pathname !== "/landing") {
        navigate("/landing");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="text-white bg-base-200 pt-20">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
