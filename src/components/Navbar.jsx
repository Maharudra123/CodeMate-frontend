import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { removeUser } from "../utils/store/userSlice";
import Logo from "../../public/Logo.png";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm py-6 fixed top-0 z-[200]">
        <div className="flex-1">
          <Link to={user ? "/" : "/landing"} className="btn btn-ghost text-xl">
            <img src={Logo} className="w-30" />
          </Link>
        </div>
        {user ? (
          <div className="flex gap-2">
            <p className="text-accent">welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user.imgURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Request</Link>
                </li>
                <li>
                  <Link to="/gopremium">Go Premium</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-ghost pl-2">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
