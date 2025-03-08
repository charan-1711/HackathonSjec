import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut, FiLock } from "react-icons/fi";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

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
      <h1 className="text-xl font-semibold ml-10 text-gray-800 ">My App</h1>
      
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
        <div className="flex items-center space-x-3 border-b pb-3 mb-3">
            <div className="">
                <FiUser size={20} className="text-gray-700" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">Charanraj</h3>
                <p className="text-sm text-gray-500">charanraj@gmail.com</p>
            </div>
        </div>
            
            {/* Options */}
            <div className="flex items-center">
                <div className="col-md-6">
            <button className="w-full flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded">
              <FiLock />
              <span>Change Password</span>
            </button>
            </div>
            <button className="w-full flex items-center space-x-2 p-2 text-red-600 hover:bg-gray-100 rounded mt-2">
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
