import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.email === form.email && u.password === form.password
  );

  if (!user) {
    setError("❌ Avval ro‘yxatdan o‘ting!");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
  window.dispatchEvent(new Event("storage"));
  navigate("/");
};


  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[#fafbfc]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && (
          <p className="mb-3 text-red-500 text-sm text-center">{error}</p>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-black"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#211C24] text-white py-2 rounded hover:bg-black transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Akkount yo‘qmi?{" "}
          <span
            onClick={() => navigate("/SignUp")}
            className="text-black cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;