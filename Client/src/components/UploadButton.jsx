// src/components/UploadButton.jsx
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const UploadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
    title="Upload New Post"
  >
    <FiPlusCircle className="text-2xl" />
  </button>
);

export default UploadButton;
