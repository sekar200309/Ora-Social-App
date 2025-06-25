import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_BASE_URL;

const ProfileModal = ({ onClose }) => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
// const API = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/users/profile", {
        const res = await axios.get(`${API}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (!profile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">👤 Profile</h2>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>User ID:</strong> {profile._id}</p>

        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
