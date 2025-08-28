import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlBasket } from "react-icons/sl";

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
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // ❌ Remove item from cart
  const removeFromCart = (index) => {
    setCart((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updated));
      toast.info("Item removed from cart ❌");
      return updated;
    });
  };

  // 🧹 Clear all cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.info("All items removed from cart 🧹");
  };

  const filteredProducts = products.filter((p) => p.tag === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header ichida basket */}
      <header className="flex justify-between items-center p-4 border-b mb-6">
        <h1 className="text-xl font-bold">My Shop</h1>
        <ul className="flex space-x-4">
          <li
            onClick={() => setIsCartOpen(true)}
            className="cursor-pointer text-2xl text-[#656565] hover:text-black transition-colors relative"
          >
            <SlBasket />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </li>
        </ul>
      </header>

      {/* Tabs */}
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

      {/* Products */}
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

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Your Cart 🛒</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty</p>
            ) : (
              <>
                <ul className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span>{item.title}</span>
                      <span className="font-semibold">${item.price}</span>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="ml-3 text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Clear all btn */}
                <button
                  onClick={clearCart}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Clear All 🧹
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast faqat bitta joyda */}
      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
