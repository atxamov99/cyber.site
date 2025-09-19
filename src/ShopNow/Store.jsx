import React, { useEffect, useMemo, useState } from "react";
import BrandFilter from "./BrandFilter";
import { Link } from "react-router-dom";

const KNOWN_BRANDS = [
  "Apple", "Samsung", "Xiaomi", "Poco", "OPPO", "Honor", "Motorola",
  "Nokia", "Realme", "OnePlus", "Huawei", "Google", "Sony",
];

const extractBrand = (title) => {
  const found = KNOWN_BRANDS.find((b) =>
    new RegExp(`\\b${b}\\b`, "i").test(title)
  );
  if (found) return found;
  return (title || "").split(" ")[0] || "Unknown";
};

const Store = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Server xatolik berdi");
        const raw = await res.json();
        const list = Array.isArray(raw) ? raw : raw?.products ?? [];
        const mapped = list.map((p) => ({
          id: Number(p.id),
          name: p.title ?? p.name ?? "Unknown",
          brand: p.brand ?? extractBrand(p.title ?? p.name ?? ""),
          image: p.image,
          price: Number(p.price) || 0,
        }));
        setProducts(mapped);
      } catch (err) {
        setError(err?.message || "Xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const filteredProducts = useMemo(
    () =>
      selectedBrands.length > 0
        ? products.filter((p) => selectedBrands.includes(p.brand))
        : products,
    [products, selectedBrands]
  );

  if (loading)
    return (
      <span className="loading loading-spinner loading-lg relative left-[calc(50%-1rem)] bottom-[35vh]"></span>
    );
  if (error)
    return (
      <p className="relative text-center bottom-[35vh] text-red-500">{error}</p>
    );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Product Filters
          </h1>
          <div className="flex gap-8">
            <BrandFilter onChange={handleBrandChange} />
            <div>
              <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                {filteredProducts.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        className="relative border rounded-lg p-4 flex flex-col items-center group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-32 object-contain mb-4"
                        />
                        <h3 className="font-semibold mb-2 text-center">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                        <p className="text-lg font-semibold mb-4">${product.price}</p>

                        <button
                          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                          onClick={() => addToCart(product)}
                        >
                          Buy Now
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No products found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;