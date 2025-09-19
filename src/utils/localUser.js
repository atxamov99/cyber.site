// src/utils/localUser.js
// Yordamchi funksiyalar: users array, current user, transactions

export const USERS_KEY = "users"; // barcha userlar ro'yxati
export const CURRENT_USER_KEY = "user"; // joriy (login) user

export function getAllUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveAllUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // trigger storage event for other tabs/components
  window.dispatchEvent(new Event("storage"));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("storage"));
}

// Create user if not exists (helper for demo/testing)
export function ensureUserExists(user) {
  const users = getAllUsers();
  const found = users.find((u) => u.email === user.email);
  if (!found) {
    users.push({
      ...user,
      balance: user.balance ?? 0,
      transactions: user.transactions ?? [],
    });
    saveAllUsers(users);
  }
}

// Update balance and push transaction for a user (by email)
export function updateUserBalance(email, amount, type, note = "") {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return false;
  const u = users[idx];
  const newBalance = Number(u.balance || 0) + Number(amount);
  users[idx] = {
    ...u,
    balance: newBalance,
    transactions: [
      ...(u.transactions || []),
      {
        id: Date.now(),
        type, // 'Deposit' | 'Transfer Out' | 'Transfer In' | 'Purchase'
        amount: Number(amount),
        note,
        date: new Date().toISOString(),
      },
    ],
  };
  saveAllUsers(users);
  // if current user is same, update CURRENT_USER_KEY too
  const current = getCurrentUser();
  if (current && current.email === email) {
    saveCurrentUser(users[idx]);
  }
  return true;
}