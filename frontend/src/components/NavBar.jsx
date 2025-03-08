import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile card when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-semibold ml-10 text-gray-800 ">
        Question Paper Generation System
      </h1>

      {/* Profile Icon */}
      <div className="relative">
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
          onClick={() => setShowProfile(!showProfile)}
        >
          <FiUser size={20} className="text-gray-700" />
        </button>

        {/* Profile Card */}
        {showProfile && (
          <div
            ref={profileRef}
            className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 border"
          >
            <div className="lg rounded-lg p-4 w-72 flex flex-col items-center">
              <div className="p-3 rounded-full mb-3">
                <FiUser size={50} className="text-gray-700" />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Charanraj
                </h3>
                <p className="text-sm text-gray-500">charanraj@gmail.com</p>
              </div>

              {/* Options */}
              <div className="w-full border-t pt-3 space-y-2"></div>
            </div>

            {/* Options */}
            <div className="flex items-center">
              <div className="">
                <button className="w-50 flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded">
                  <FiLock />
                  <span>Change Password</span>
                </button>
              </div>
              <button className="w-775 flex items-center space-x-3 p-2 text-red-600 hover:bg-gray-100 rounded mt-2">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
