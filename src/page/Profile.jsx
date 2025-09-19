// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/localUser";

const Profile = () => {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!user) return <p className="p-6">Iltimos tizimga kiring.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Profil</h2>
      <p className="mb-1"><strong>Ism:</strong> {user.name}</p>
      <p className="mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="mb-3"><strong>Balans:</strong> <span className="text-green-600 font-bold">{(user.balance||0).toLocaleString()} so'm</span></p>
      <a href="/wallet" className="px-4 py-2 bg-indigo-600 text-white rounded">Walletga o‘tish</a>
    </div>
  );
};

export default Profile;
