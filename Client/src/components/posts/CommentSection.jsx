// src/components/posts/CommentSection.jsx
import React, { useState } from "react";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const API = import.meta.env.VITE_API_BASE_URL;
const CommentSection = ({ postId, comments = [], onCommentAdded }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const { token } = useAuth();
// const API = process.env.REACT_APP_API_BASE_URL;
  const handleAddComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        // `http://localhost:5000/api/posts/${postId}/comment`,
        `${API}/api/posts/${postId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      if (onCommentAdded) onCommentAdded(res.data);
    } catch (err) {
      console.error("❌ Error adding comment:", err);
    }
  };

  return (
    <div className="mt-3">
      {/* Toggle Button */}
      <button
        onClick={() => setShow(!show)}
        className="flex items-center text-sm text-gray-400 hover:text-white transition"
      >
        <FiMessageCircle className="mr-1" />
        {comments.length}
      </button>

      {/* Comment Box */}
      {show && (
        <div className="mt-2 bg-[#111827] p-3 rounded-lg border border-gray-700 shadow">
          {/* Comments List */}
          <div className="max-h-40 overflow-y-auto space-y-2 text-sm mb-3">
            {comments.length === 0 ? (
              <p className="text-gray-400">No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="text-gray-300 border-b border-gray-700 pb-1"
                >
                  <strong className="text-white">User:</strong> {c.text}
                </div>
              ))
            )}
          </div>

          {/* Input + Send */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded bg-[#374151] text-white text-sm outline-none"
            />
            <button
              onClick={handleAddComment}
              className="text-blue-500 hover:text-blue-600"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
