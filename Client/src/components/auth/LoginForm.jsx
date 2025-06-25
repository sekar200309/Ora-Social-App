// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;
const LoginForm = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const API = process.env.REACT_APP_API_BASE_URL; // or import.meta.env.VITE_API_BASE_URL for Vite


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-black text-black dark:text-white">
  <form
    onSubmit={handleLogin}
    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-sm mx-4"
  >
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
      Login
    </h2>

    {error && (
      <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
    )}

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
    >
      Login
    </button>

    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
      Don’t have an account?{" "}
      <Link
        to="/register"
        className="text-blue-500 hover:underline dark:text-blue-400"
      >
        Register
      </Link>
    </p>
  </form>
</div>

  );
};

export default LoginForm;
