import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Feed from "../components/Feed";
import UploadButton from "../components/UploadButton";
import PostUploader from "../components/posts/PostUploader";
import ProfileModal from "../components/ProfileModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [reloadFeed, setReloadFeed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      {/* Sidebar (desktop) + Bottom Navbar (mobile) */}
      <Sidebar
        onUploadClick={() => setShowModal(true)}
        onProfileClick={() => setShowProfile(true)}
      />

      {/* Feed Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-6 md:ml-[20%] lg:ml-64 pb-24">
        <Feed reload={reloadFeed} />
      </main>

      {/* Upload Button for Desktop (optional placement) */}
      <div className="hidden md:block md:w-1/5 lg:w-64 p-4">
        <UploadButton onClick={() => setShowModal(true)} />
      </div>

      {/* Post Upload Modal */}
      {showModal && (
        <PostUploader
          onClose={() => setShowModal(false)}
          onUpload={() => {
            setReloadFeed(!reloadFeed);
            setShowModal(false);
          }}
        />
      )}

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Home;
