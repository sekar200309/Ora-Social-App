import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const API = process.env.REACT_APP_API_BASE_URL; 
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:5000/api/auth/register", formData);
      await axios.post(`${API}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-black text-black dark:text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-sm mx-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          required
        />

       <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
>
  Register
</button>


        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

