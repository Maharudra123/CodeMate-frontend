import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    imgURL: user?.imgURL || "",
    gender: user?.gender || "",
    age: user?.age || "",
    skills: user?.skills || [],
    isPremium: user?.isPremium || false,
  });
  const navigate = useNavigate();
  // State for the skills input field as a string
  const [skillsInput, setSkillsInput] = useState(
    user?.skills ? user.skills.join(", ") : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      // Ensure age is a number or empty string
      const ageValue = value === "" ? "" : parseInt(value) || "";
      setFormData({
        ...formData,
        age: ageValue,
      });
    } else if (name !== "skills") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Separate handler for skills input
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);

    // Convert to array for the form data
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setFormData({
      ...formData,
      skills: skillsArray,
    });
  };

  const dispatch = useDispatch();

  const update = async () => {
    try {
      setIsLoading(true);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          imgURL: formData.imgURL,
          age: formData.age === "" ? null : Number(formData.age),
          about: formData.about,
          skills: formData.skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully!");
      navigate("/");
      location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-8 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {/* Profile Form */}
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Update Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2 mt-6">
            <label className="block text-sm font-medium text-gray-300">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              placeholder="Enter your age"
              min="0"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2 mt-6">
            <label className="block text-sm font-medium text-gray-300">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            >
              <option value="" className="bg-gray-800">
                Select gender
              </option>
              <option value="male" className="bg-gray-800">
                Male
              </option>
              <option value="female" className="bg-gray-800">
                Female
              </option>
              <option value="other" className="bg-gray-800">
                Other
              </option>
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-2 mt-6">
            <label className="block text-sm font-medium text-gray-300">
              Profile Image URL
            </label>
            <input
              type="text"
              name="imgURL"
              value={formData.imgURL}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              placeholder="Enter profile image URL"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2 mt-6">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">
                Skills
              </label>
              <span className="text-xs text-gray-400">Comma separated</span>
            </div>
            <input
              type="text"
              name="skills"
              value={skillsInput}
              onChange={handleSkillsChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              placeholder="React, JavaScript, CSS"
            />

            {/* Skills tags visualization */}
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-2 mt-6">
            <label className="block text-sm font-medium text-gray-300">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none h-24"
              placeholder="Write something about yourself"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isLoading ? "animate-pulse" : ""
              }`}
              onClick={update}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* UserCard Preview */}
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Profile Preview
          </h2>
          <UserCard
            user={{
              firstName: formData?.firstName,
              lastName: formData?.lastName,
              gender: formData?.gender,
              imgURL: formData?.imgURL,
              age: formData?.age,
              about: formData?.about,
              skills: formData?.skills,
              isPremium: formData?.isPremium,
            }}
            isTop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
