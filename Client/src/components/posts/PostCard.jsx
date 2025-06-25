
import React, { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { FiShare2 } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;
const PostCard = ({ post }) => {
  if (!post) return null;

  const { userr, token } = useAuth();
  const currentUserId = userr?._id;

  const {
    _id,
    caption,
    imageUrl,
    image,
    likes = [],
    postedBy,
    user,
    createdAt,
    comments = [],
  } = post;

  const finalImage =
    imageUrl ||
    (image
      ? `https://res.cloudinary.com/duu9o7ak9/image/upload/v1750660000/mern-social-posts/${image}`
      : null);

  const finalUser = postedBy?.username || user?.username || "Unknown User";

  const [localComments, setLocalComments] = useState(comments);
  const [saved, setSaved] = useState(false);
// const API = process.env.REACT_APP_API_BASE_URL;
  // 🔄 Check if post is saved on initial load
  useEffect(() => {
    if (userr?.savedPosts?.includes(_id)) {
      setSaved(true);
    }
  }, [userr, _id]);

  const handleShare = () => {
    const url = `${window.location.origin}/post/${_id}`;
    navigator.clipboard.writeText(url);
    alert("🔗 Post link copied to clipboard!");
  };

  const handleSaveToggle = async () => {
    try {
      const res = await axios.put(
        // `http://localhost:5000/api/posts/${_id}/save`,
        `${API}/api/posts/${_id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(res.data.saved);
    } catch (err) {
      console.error("❌ Error saving post:", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg mb-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-lg">{finalUser}</span>
        <span className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Post Image */}
      {finalImage && (
        <img
          src={finalImage}
          alt="Post"
          className="w-full rounded-lg mb-4 object-cover max-h-[600px]"
        />
      )}

      {/* Caption */}
      {caption && <p className="text-gray-300 text-base mb-2">{caption}</p>}

      {/* Like */}
      <LikeButton
        postId={_id}
        liked={likes.includes(currentUserId)}
        count={likes.length}
        onLikeToggle={(updatedLikes) => {
          post.likes = updatedLikes;
        }}
      />

      {/* Comment */}
      <CommentSection
        postId={_id}
        comments={localComments}
        onCommentAdded={(newComment) =>
          setLocalComments((prev) => [...prev, newComment])
        }
      />

      {/* Footer: Share + Save */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
        <button
          onClick={handleShare}
          className="flex items-center hover:text-white transition"
        >
          <FiShare2 className="mr-1" />
          Share
        </button>

        <button
          onClick={handleSaveToggle}
          className="flex items-center hover:text-white transition"
        >
          {saved ? <BsBookmarkFill /> : <BsBookmark />}
          <span className="ml-1">Save</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
