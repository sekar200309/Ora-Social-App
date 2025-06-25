
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiPlusCircle,
  FiBookmark,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ onUploadClick, onProfileClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 w-16 md:w-20 lg:w-64 h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-4 flex-col items-center lg:items-start z-20">
        <Link to="/" className="mb-6 text-xl font-bold hidden lg:block">
          Ora
        </Link>

        <nav className="flex flex-col gap-4 w-full">
          <Link to="/" className="flex items-center gap-3 hover:text-blue-500 transition">
            <FiHome size={20} />
            <span className="hidden lg:block cursor-pointer">Home</span>
          </Link>

          <button onClick={onProfileClick} className="flex items-center gap-3 hover:text-blue-500 transition">
            <FiUser size={20} />
            <span className="hidden lg:block cursor-pointer">Profile</span>
          </button>

          <button onClick={onUploadClick} className="flex items-center gap-3 text-blue-500 hover:text-blue-600 transition">
            <FiPlusCircle size={20} />
            <span className="hidden lg:block cursor-pointer">Upload</span>
          </button>

          <Link to="/saved" className="flex items-center gap-3 hover:text-blue-400 transition">
            <FiBookmark size={20} />
            <span className="hidden lg:block cursor-pointer">Saved</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition mt-4"
          >
            <FiLogOut size={20} />
            <span className="hidden lg:block cursor-pointer">Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 p-2 md:hidden z-50">
        <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 cursor-pointer">
          <FiHome size={22} />
        </Link>

        <button onClick={onProfileClick} className="text-gray-600 dark:text-gray-200 hover:text-blue-500 cursor-pointer">
          <FiUser size={22} />
        </button>

        <button onClick={onUploadClick} className="text-blue-500 hover:text-blue-600 cursor-pointer">
          <FiPlusCircle size={28} />
        </button>

        <Link to="/saved" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 cursor-pointer">
          <FiBookmark size={22} />
        </Link>

        <button onClick={handleLogout} className="text-red-500 hover:text-red-600 cursor-pointer">
          <FiLogOut size={22} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;

