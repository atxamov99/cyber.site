import React, { useState } from "react";
import { Search } from "lucide-react";

const BrandFilter = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([
    { name: "Apple", count: 110, checked: false },
    { name: "Samsung", count: 125, checked: false },
    { name: "Xiaomi", count: 68, checked: false },
    { name: "Poco", count: 44, checked: false },
    { name: "OPPO", count: 32, checked: false },
    { name: "Honor", count: 19, checked: false },
    { name: "Motorola", count: 14, checked: false },
    { name: "Nokia", count: 27, checked: false },
    { name: "Realme", count: 35, checked: false },
  ]);

  const handleBrandToggle = (name) => {
    setBrands((prev) => {
      const updated = prev.map((b) =>
        b.name === name ? { ...b, checked: !b.checked } : b
      );
      const selected = updated.filter((b) => b.checked).map((b) => b.name);
      if (typeof onChange === "function") onChange(selected);
      return updated;
    });
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 h-[430px] bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Search Input */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Brand List */}
        <div className="space-y-3">
          {filteredBrands.map((brand) => (
            <label
              key={brand.name}
              className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-150"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={brand.checked}
                  onChange={() => handleBrandToggle(brand.name)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-150"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                  {brand.name}
                </span>
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-150">
                {brand.count}
              </span>
            </label>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-4">
            No brands found
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandFilter;