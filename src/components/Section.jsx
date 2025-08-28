import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Section() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Wishlist toggle
  const toggleWishlist = (id, title) => {
    setWishlist((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((pid) => pid !== id);
        toast.info(`${title} removed from wishlist ❤️‍🔥`);
      } else {
        updated = [...prev, id];
        toast.success(`${title} added to wishlist ❤️`);
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      toast.success(`${product.title} added to cart 🛒`);
      return updated;
    });
  };

  const filteredProducts = products.filter((p) => p.tag === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex space-x-6 border-b border-gray-200 mb-8">
        {["New Arrival", "Bestseller", "Featured Products"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative border rounded-lg p-4 flex flex-col items-center group"
            >
              {/* Wishlist tugmasi */}
              <button
                onClick={() => toggleWishlist(product.id, product.title)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                {wishlist.includes(product.id) ? "❤️" : "🤍"}
              </button>

              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />

              <h3 className="text-sm font-medium text-center text-gray-900 mb-2">
                {product.title}
              </h3>

              <p className="text-lg font-semibold text-gray-900 mb-4">
                ${product.price}
              </p>

              {/* Cart tugmasi */}
              <button
                onClick={() => addToCart(product)}
                className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
