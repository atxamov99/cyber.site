import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { FiEye, FiEyeOff } from "react-icons/fi";
import User from "../assets/user.png";

const Header = ({ cart }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () =>
      setUser(JSON.parse(localStorage.getItem("user")));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Dropdown tashqarisiga bosilganda yopiladi
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    if (dropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn"); // isLoggedIn flag ham o‘chsin
  setUser(null);
  setDropdown(false);
  navigate("/login"); // endi login sahifasiga qaytaradi
};

  const [showPassword, setShowPassword] = useState(false);

  return (
    <header>
      <nav className="max-w-[1200px] mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-lg font-bold">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="bg-[#F5F5F5] text-[#656565] flex items-center px-6 py-2 rounded">
          <CiSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#F5F5F5] pl-1.5 text-[#656565] outline-none border-none"
          />
        </div>
        <ul className="flex space-x-4">
          <Link
            to="/"
            className="cursor-pointer text-[#656565] hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="cursor-pointer text-[#656565] hover:text-black transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="cursor-pointer text-[#656565] hover:text-black transition-colors"
          >
            Contact Us
          </Link>
        </ul>
        <ul className="flex space-x-4 items-center">
          {/* Savatcha */}
          <Link
            to="/cart"
            className="relative cursor-pointer text-[#656565] hover:text-black transition-colors"
          >
            <SlBasket size={20} />
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User account */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={User}
                alt="avatar"
                className="w-8 h-8 rounded-full border cursor-pointer"
                title={user.name}
                onClick={() => setDropdown((d) => !d)}
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white overflow-auto p-2.5 rounded-lg shadow-lg z-50 border">
                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b">
                    <img
                      src={User}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-semibold">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="ml-auto text-red-500"
                    >
                      ↩️
                    </button>
                  </div>

                  {/* Email */}
                  <div className="px-4 py-2 border-b">
                    <span className="block text-xs text-gray-400">Email:</span>
                    <span className="font-semibold text-gray-700 text-sm">
                      {user.email}
                    </span>
                  </div>

                  {/* Password */}
                  <div className="flex items-center px-4 py-2 border-b">
                    <span className="text-xs text-gray-400 mr-2">Parol:</span>
                    <span className="font-mono text-sm">
                      {showPassword ? user.password : "••••••••"}
                    </span>
                    <button
                      onClick={() => setShowPassword((v) => !v)}
                      className="ml-2 text-gray-500 hover:text-black"
                      title={showPassword ? "Yashirish" : "Ko‘rsatish"}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>

                  {/* Wallet (Hisob) */}
                  <div className="px-4 py-2 border-b">
                    <span className="block text-xs text-gray-400">Hisob:</span>
                    <span className="font-semibold text-green-600 text-sm">
                      {user.balance ? `$${user.balance}` : "$0.00"}
                    </span>
                  </div>

                  {/* Menu */}
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#211C24]"
                      >
                        <span className="mr-2">👤</span> Profil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#211C24]"
                      >
                        <span className="mr-2">⚙️</span> Sozlamalar
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/wallet"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-[#211C24]"
                      >
                        <span className="mr-2">💳</span> Hisob (Wallet)
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500"
                      >
                        <span className="mr-2">↩️</span> Chiqish
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Link
                to="/SignUp"
                className="ml-2 px-4 py-1 rounded border border-[#656565] text-[#656565] hover:bg-[#656565] hover:text-white transition"
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;