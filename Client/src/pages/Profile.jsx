// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
// const API = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/users/profile", {
        const res = await axios.get(`${API}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        console.log("Profile:", res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (!profile) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <p><strong>ID:</strong> {profile._id}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default Profile;
