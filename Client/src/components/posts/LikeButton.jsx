import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;
const LikeButton = ({ postId, liked, count, onLikeToggle }) => {
  const { token } = useAuth();
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(count);
// const API = process.env.REACT_APP_API_BASE_URL;
  const handleToggle = async () => {
    try {
      const res = await axios.put(
        // `http://localhost:5000/api/posts/${postId}/like`,
        `${API}/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      const updatedLikes = res.data.likes || [];
      setIsLiked(updatedLikes.includes(token?.userId)); // optional
      setLikeCount(updatedLikes.length);

      // Notify parent to update post state (optional)
      if (onLikeToggle) onLikeToggle(updatedLikes);
    } catch (err) {
      console.error("❌ Like toggle failed:", err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1 text-sm ${
        isLiked ? "text-red-500" : "text-gray-400"
      } hover:text-red-400 transition mb-2`}
    >
      <FiHeart className="mr-1" />
      {likeCount}
    </button>
  );
};

export default LikeButton;
