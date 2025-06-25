
// src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "./posts/PostCard";
const API = import.meta.env.VITE_API_BASE_URL;

const Feed = ({ reload }) => { //  Accept reload as prop
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
// const API = process.env.REACT_APP_API_BASE_URL;
  const fetchPosts = async () => {
    try {
      // const res = await axios.get(`http://localhost:5000/api/posts`, {
      const res = await axios.get(`${API}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("Fetched data:", res.data);

      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else if (res.data.posts && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [reload]); 

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading posts...</p>;
  }

  return (
    <main className="flex-1 px-4 sm:px-8 py-8 max-w-2xl mx-auto mt-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  );
};

export default Feed;

