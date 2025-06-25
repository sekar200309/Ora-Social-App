import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/posts/PostCard";
import Sidebar from "../components/layout/Sidebar";
const API = import.meta.env.VITE_API_BASE_URL;

const SavedPosts = () => {
  const { token } = useAuth();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
// const API = process.env.REACT_APP_API_BASE_URL;
  const [showModal, setShowModal] = useState(false); // optional if you want upload modal
  const [showProfile, setShowProfile] = useState(false); // optional if you have profile modal

  const fetchSavedPosts = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/posts/saved", {
      const res = await axios.get(`${API}/api/posts/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedPosts(res.data);
    } catch (err) {
      console.error("Error fetching saved posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      {/* Sidebar (hidden on mobile) */}
      <aside className="w-1/5 border-r p-4 hidden md:block">
        <Sidebar
          onUploadClick={() => setShowModal(true)}
          onProfileClick={() => setShowProfile(true)}
        />
      </aside>

      {/* Content */}
      {/* <main className="flex-1 max-w-2xl mx-auto p-4 mt-4"> */}

      <main className="flex-1 max-w-2xl mx-auto p-4 mt-4 md:ml-[20%] lg:ml-64">

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Saved Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading saved posts...</p>
        ) : savedPosts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You haven't saved any posts yet.
          </p>
        ) : (
          savedPosts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </main>
    </div>
  );
};

export default SavedPosts;
