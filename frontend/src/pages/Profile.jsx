// frontend/src/pages/Profile.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
   
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setProfileData({
        firstName: res.data.first_name || "",
        lastName: res.data.last_name || "",
        phone: res.data.phone || "",
      
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    }
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (profileData.phone && !/^\+?[\d\s-()]{10,}$/.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validateProfile()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put("/api/auth/me", {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
        bio: profileData.bio,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/auth/change-password", {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("Current password is incorrect");
        setErrors((prev) => ({ ...prev, oldPassword: "Incorrect password" }));
      } else {
        toast.error("Failed to change password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    return `${profileData.firstName?.[0] || ""}${
      profileData.lastName?.[0] || ""
    }`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
                <span className="text-white text-4xl font-bold">
                  {getInitials()}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-300 text-lg mb-4">{user?.email}</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="capitalize">{user?.role}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-8">
          <button
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "profile"
                ? "text-red-500 border-red-500"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "password"
                ? "text-red-500 border-red-500"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Profile Information
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-gray-600 focus:border-red-500"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-gray-600 focus:border-red-500"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                  disabled
                />
                <p className="text-gray-400 text-sm mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-600 focus:border-red-500"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.phone}
                  </p>
                )}
              </div>

              

              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                    errors.oldPassword
                      ? "border-red-500"
                      : "border-gray-600 focus:border-red-500"
                  }`}
                  placeholder="Enter your current password"
                />
                {errors.oldPassword && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.oldPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                    errors.newPassword
                      ? "border-red-500"
                      : "border-gray-600 focus:border-red-500"
                  }`}
                  placeholder="Enter your new password"
                />
                {errors.newPassword && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.newPassword}
                  </p>
                )}
                <div className="text-gray-400 text-sm mt-2">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li
                      className={
                        passwordData.newPassword.length >= 8
                          ? "text-green-400"
                          : ""
                      }
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={
                        /[a-z]/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      One lowercase letter
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      One uppercase letter
                    </li>
                    <li
                      className={
                        /\d/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      One number
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-xl focus:outline-none transition-colors text-white ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-600 focus:border-red-500"
                  }`}
                  placeholder="Confirm your new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Changing Password...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    Change Password
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
