import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/login`, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      
      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", response.data.user.isAdmin.toString());
         localStorage.setItem("userId", response.data.user.userId);
        if (response.data.user.isAdmin) {
          nav("/admin");
        } else {
          nav("/dashboard/home");
          console.log("redirect");
          
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 text-white  rounded-lg  bg-primary transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
