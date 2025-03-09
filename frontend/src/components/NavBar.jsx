import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar({ userData }) {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigation
  console.log(userData);
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
    </nav>
  );
}
