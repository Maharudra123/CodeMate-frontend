import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
  // State for profile fields
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    imgURL: user?.imgURL || "",
    gender: user?.gender || "",
    age: user?.age || undefined,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  const update = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          imgURL: formData.imgURL,
          age: formData.age,
          about: formData.about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      toast.success("user profile updated ");
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 min-h-screen bg-gray-50 p-4">
      {/* Profile Form */}
      <div className="w-full max-w-lg bg-white shadow-lg border border-gray-200 rounded-2xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Update Profile
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="label font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="label font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter last name"
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="label font-medium text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="textarea textarea-bordered w-full rounded-lg px-4 py-2 h-24 resize-none focus:ring focus:ring-blue-300"
            placeholder="Write something about yourself"
          />
        </div>
        <div className="mb-4">
          <label className="label font-medium text-gray-700">About</label>
          <textarea
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter your age"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="label font-medium text-gray-700">
            Profile Image URL
          </label>
          <input
            type="text"
            name="imgURL"
            value={formData.imgURL}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter profile image URL"
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="label font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button (no logic for now) */}
        <button
          className="btn btn-primary w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition duration-200"
          onClick={update}
        >
          Update Profile
        </button>
      </div>

      {/* UserCard */}
      <div className="w-full max-w-md">
        <UserCard
          user={{
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            imgURL: formData.imgURL,
            age: formData.age,
            about: formData.about,
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
