import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    imgURL: user?.imgURL || "",
    gender: user?.gender || "",
    age: user?.age || "",
    skills: user?.skills || [],
  });

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
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-8 min-h-screen bg-base-200 p-4">
      {/* Profile Form */}
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            Update Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Age */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Age</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your age"
              min="0"
            />
          </div>

          {/* Gender */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Gender</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Profile Image URL</span>
            </label>
            <input
              type="text"
              name="imgURL"
              value={formData.imgURL}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter profile image URL"
            />
          </div>

          {/* Skills */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Skills</span>
              <span className="label-text-alt">Comma separated</span>
            </label>
            <input
              type="text"
              name="skills"
              value={skillsInput}
              onChange={handleSkillsChange}
              className="input input-bordered w-full"
              placeholder="React, JavaScript, CSS"
            />

            {/* Skills tags visualization */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="badge badge-primary">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">About</span>
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Write something about yourself"
            />
          </div>

          {/* Submit Button */}
          <div className="card-actions justify-end mt-6">
            <button
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              onClick={update}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* UserCard Preview */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            Profile Preview
          </h2>
          <UserCard
            user={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              gender: formData.gender,
              imgURL: formData.imgURL,
              age: formData.age,
              about: formData.about,
              skills: formData.skills,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
