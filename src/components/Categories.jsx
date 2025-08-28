import React from "react";

const categories = [
  {
    label: "Phones",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    ),
  },
  {
    label: "Smart Watches",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="7" y="5" width="10" height="14" rx="3" />
        <rect x="9" y="2" width="6" height="2" rx="1" />
        <rect x="9" y="20" width="6" height="2" rx="1" />
      </svg>
    ),
  },
  {
    label: "Cameras",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <circle cx="12" cy="13.5" r="3.5" />
        <rect x="8" y="3" width="8" height="4" rx="2" />
      </svg>
    ),
  },
  {
    label: "Headphones",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 18v-3a8 8 0 0 1 16 0v3" />
        <rect x="2" y="15" width="4" height="6" rx="2" />
        <rect x="18" y="15" width="4" height="6" rx="2" />
      </svg>
    ),
  },
  {
    label: "Computers",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <rect x="8" y="19" width="8" height="2" rx="1" />
      </svg>
    ),
  },
  {
    label: "Gaming",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="10" rx="5" />
        <circle cx="7" cy="12" r="1" />
        <circle cx="17" cy="12" r="1" />
        <path d="M12 10v4" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <div className="bg-[#fafbfc] py-2">
      <div className="max-w-4xl mx-auto">
  
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold font-sans">Browse By Category</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center justify-center bg-[#f3f4f6] rounded-lg py-6 cursor-pointer hover:bg-gray-200 transition"
            >
              <div className="mb-2 text-gray-700">{cat.icon}</div>
              <span className="text-base font-medium text-gray-800">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    
  );
}