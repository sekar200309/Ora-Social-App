import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Ora</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Connect. Share. Save.</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mb-6">
          Ora is your minimalist social space where you can share moments, like posts,
          comment on thoughts, and save what matters to you.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3 px-8 max-w-5xl mx-auto">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Upload Posts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Share your photos and captions easily with one click.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Like & Comment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">React to posts and engage with your friends' content.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Save for Later</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Bookmark your favorite posts to view them anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Ora | Built with ❤️
      </footer>
    </div>
  );
};

export default LandingPage;
