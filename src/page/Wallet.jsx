// src/pages/Wallet.jsx
import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  saveCurrentUser,
  getAllUsers,
  ensureUserExists,
  updateUserBalance,
} from "../utils/localUser";

const formatCurrency = (v) =>
  Number(v).toLocaleString("en-US", { style: "decimal", maximumFractionDigits: 0 });

const Wallet = () => {
  // joriy userni localStorage'dan olamiz
  const [user, setUser] = useState(() => getCurrentUser());
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // demo uchun agar users bo'lmasa, misol userlarni yaratib qo'yish mumkin
    const demo = getAllUsers();
    if (demo.length === 0) {
      // agar siz avval SignUp orqali userlar qo'shsangiz bu qism shart emas
      ensureUserExists({
        name: "Alice",
        email: "alice@example.com",
        password: "alice123",
        balance: 200000,
        transactions: [
          { id: 1, type: "Deposit", amount: 200000, note: "Initial", date: new Date().toISOString() },
        ],
      });
      ensureUserExists({
        name: "Bob",
        email: "bob@example.com",
        password: "bob123",
        balance: 50000,
        transactions: [
          { id: 2, type: "Deposit", amount: 50000, note: "Initial", date: new Date().toISOString() },
        ],
      });
    }
    setAllUsers(getAllUsers());

    const onStorage = () => {
      setUser(getCurrentUser());
      setAllUsers(getAllUsers());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Agar user bo'lmasa redirect qilish ham mumkin (siz react-router bilan qilasiz)
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Hisobingiz topilmadi</h2>
        <p className="text-gray-600">Iltimos avval tizimga kiring yoki ro‘yxatdan o‘ting.</p>
      </div>
    );
  }

  const onAddFunds = async (e) => {
    e.preventDefault();
    setMessage(null);
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setMessage({ type: "error", text: "Iltimos to‘g‘ri miqdor kiriting." });
      return;
    }

    setLoading(true);
    // Simulyatsiya: foydalanuvchi balansini yangilash
    const ok = updateUserBalance(user.email, amt, "Deposit", note || "Top-up via Wallet");
    if (ok) {
      const updated = getAllUsers().find((u) => u.email === user.email);
      saveCurrentUser(updated);
      setUser(updated);
      setAmount("");
      setNote("");
      setMessage({ type: "success", text: `✅ ${formatCurrency(amt)} so'm qo'shildi.` });
    } else {
      setMessage({ type: "error", text: "Xatolik yuz berdi." });
    }
    setLoading(false);
  };

  const onTransfer = async (e) => {
    e.preventDefault();
    setMessage(null);
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setMessage({ type: "error", text: "To‘g‘ri miqdor kiriting." });
      return;
    }
    if (recipientEmail.trim() === "") {
      setMessage({ type: "error", text: "Oluvchi emailini kiriting." });
      return;
    }
    if (recipientEmail === user.email) {
      setMessage({ type: "error", text: "O‘zingizga o‘tkaza olmaysiz." });
      return;
    }
    // tekshirish
    const users = getAllUsers();
    const recipient = users.find((u) => u.email === recipientEmail);
    if (!recipient) {
      setMessage({ type: "error", text: "Oluvchi topilmadi — email noto‘g‘ri." });
      return;
    }
    if ((user.balance || 0) < amt) {
      setMessage({ type: "error", text: "Balans yetarli emas." });
      return;
    }

    setLoading(true);
    // 1) chiqim (Transfer Out) — joriy userdan ayirish
    const outOk = updateUserBalance(user.email, -amt, "Transfer Out", `To ${recipientEmail} ${note || ""}`);
    // 2) kirim (Transfer In) — recipientga qo'shish
    const inOk = updateUserBalance(recipientEmail, amt, "Transfer In", `From ${user.email} ${note || ""}`);

    if (outOk && inOk) {
      // update current user
      const updated = getAllUsers().find((u) => u.email === user.email);
      saveCurrentUser(updated);
      setUser(updated);
      setAllUsers(getAllUsers());
      setAmount("");
      setRecipientEmail("");
      setNote("");
      setMessage({ type: "success", text: `✅ ${formatCurrency(amt)} so'm ${recipient.name} ga yuborildi.` });
    } else {
      setMessage({ type: "error", text: "O‘tkazishda xatolik yuz berdi." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">💳 Wallet</h1>

      {/* Balans karta */}
      <div className="bg-gradient-to-r from-white to-gray-50 border p-6 rounded-xl shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Hisob egasi</p>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Balans</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(user.balance || 0)} so'm</p>
            <p className="text-xs text-gray-400 mt-1">Hisob raqami: <span className="font-mono ml-1">WALLET-{String(user.email).slice(0,4).toUpperCase()}</span></p>
          </div>
        </div>
      </div>

      {/* Action forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Add funds */}
        <form onSubmit={onAddFunds} className="bg-white border p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Pul qo'shish (Deposit)</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Miqdor (so'm)"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Izoh (masalan: Telefon to‘lov)"
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Kuting..." : "Add Funds"}
          </button>
        </form>

        {/* Transfer */}
        <form onSubmit={onTransfer} className="bg-white border p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Pul o‘tkazish (Transfer)</h3>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Oluvchi email"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Miqdor (so'm)"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Izoh (majburiy emas)"
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Yuborilmoqda..." : "Transfer"}
          </button>
        </form>
      </div>

      {/* Xabar */}
      {message && (
        <div
          className={`p-3 rounded mb-4 ${
            message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Transaction history */}
      <div className="bg-white border p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-3">Transaction History</h3>
        {user.transactions && user.transactions.length > 0 ? (
          <ul className="space-y-2">
            {user.transactions.slice().reverse().map((t) => (
              <li key={t.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="text-sm font-medium">{t.type}</div>
                  <div className="text-xs text-gray-500">{t.note}</div>
                </div>
                <div className="text-right">
                  <div className={t.amount > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {t.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(t.amount))} so'm
                  </div>
                  <div className="text-xs text-gray-400">{new Date(t.date).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Hali tranzaksiyalar yo‘q.</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;