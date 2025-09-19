import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Avvalgi foydalanuvchilarni olish
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Yangi user
    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      wallet: 0, // balans uchun
    };

    // Ro‘yxatga qo‘shish
    users.push(newUser);

    // Saqlash
    localStorage.setItem("users", JSON.stringify(users));

    // Avtomatik login
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");

    setForm({ name: "", email: "", password: "" });
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded-lg px-10 py-2 w-full focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-10 py-2 w-full focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-10 py-2 w-full focus:ring-2 focus:ring-red-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline cursor-pointer">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;