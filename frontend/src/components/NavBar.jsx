import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiLogOut, FiKey } from "react-icons/fi";

export default function Navbar({ userData }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigation

  //  Close profile card when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Change Password function
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/user/users",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        alert("Password changed successfully");
        setShowChangePassword(false);
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to change password");
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-semibold ml-10 sm:text-sm text-gray-800">
        Question Paper Generation System
      </h1>

      {/* Profile Icon */}
      <div className="relative">
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
          onClick={() => setShowProfile((prev) => !prev)}
        >
          <FiUser size={16} className="text-gray-700" />
        </button>

        {/* Profile Card */}
        {showProfile && (
          <div
            ref={profileRef}
            className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-3 border"
          >
            {/* Profile Section in Row */}
            <div className="flex flex-row items-center gap-3 p-2 border-b pb-2">
              {/* Profile Icon */}
              <div className="p-2 rounded-full bg-gray-100">
                <FiUser size={24} className="text-gray-700" />
              </div>

              {/* User Info */}
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800">
                  {userData.name}
                </h3>
                <p className="text-xs text-gray-500">{userData.email}</p>
                <p className="text-xs text-gray-500">Role: {userData.role}</p>
              </div>
            </div>

            {/* Change Password Button */}
            <button
              className="w-full flex items-center justify-center space-x-2 p-2 text-blue-600 hover:bg-gray-100 rounded mt-2 text-sm"
              onClick={() => setShowChangePassword(true)}
            >
              <FiKey size={14} />
              <span>Change Password</span>
            </button>

            {/* Logout Button */}
            <button
              className="w-full flex items-center justify-center space-x-2 p-2 text-red-600 hover:bg-gray-100 rounded mt-2 text-sm"
              onClick={handleLogout}
            >
              <FiLogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Change Password Popup */}
      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Old Password"
              className="w-full p-2 border rounded mb-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleChangePassword}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
