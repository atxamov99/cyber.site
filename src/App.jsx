import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Section from "./components/Section";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import SignUp from "./page/SignUp";
import ContactUs from "./page/ContactUs";
import Blog from "./page/About";
import Wallet from "./page/Wallet";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Store from "./ShopNow/Store";
import OrderSummary from "./Cart/OrderSummary";
import CartItem from "./Cart/CartItem";
import AddressStep from "./steps/AddressStep";
import ShippingStep from "./steps/ShippingStep";
import PaymentStep from "./steps/PaymentStep";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Savatcha sahifasi
const CartPage = ({
  cart,
  increase,
  decrease,
  remove,
  discount,
  checkoutStep,
  setCheckoutStep,
  applyPromo,
  setCart,
  setDiscount,
}) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedSubtotal = subtotal - subtotal * discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("❌ Savatcha bo‘sh!");
      return;
    }
    setCheckoutStep(1);
  };

  return (
    <main className="container mx-auto flex gap-12 py-12 px-6 flex-1">
      {checkoutStep === 0 && (
        <>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increase(item.id)}
                  onDecrease={() => decrease(item.id)}
                  onRemove={() => remove(item.id)}
                />
              ))
            ) : (
              <p className="text-gray-500">Savatcha bo‘sh...</p>
            )}
          </div>
          <div className="w-96">
            <OrderSummary
              subtotal={discountedSubtotal}
              tax={50}
              shipping={29}
              onCheckout={handleCheckout}
              onApply={applyPromo}
            />
          </div>
        </>
      )}
      {checkoutStep === 1 && (
        <AddressStep
          onNext={() => setCheckoutStep(2)}
          onBack={() => setCheckoutStep(0)}
        />
      )}
      {checkoutStep === 2 && (
        <ShippingStep
          onNext={() => setCheckoutStep(3)}
          onBack={() => setCheckoutStep(1)}
        />
      )}
      {checkoutStep === 3 && (
        <PaymentStep
          total={discountedSubtotal + 50 + 29}
          onFinish={() => {
            toast.success(
              `✅ Buyurtma amalga oshirildi! Umumiy summa: $${discountedSubtotal + 50 + 29}`
            );
            setCart([]);
            setDiscount(0);
            setCheckoutStep(0);
          }}
          onBack={() => setCheckoutStep(2)}
        />
      )}
    </main>
  );
};

// Asosiy App
const App = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(0);

  // db.json dan cart olish
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Xato:", err));
  }, []);

  // Savatchadagi mahsulotni +1 qilish
  const increase = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  // Savatchadagi mahsulotni -1 qilish
  const decrease = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  // Savatchadan butunlay o‘chirish
  const remove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  // Mahsulot qo‘shish (Store yoki Section’dan)
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Promo code
  const applyPromo = (code) => {
    if (code.toLowerCase() === "cyber10") {
      setDiscount(0.1);
      toast.success("✅ Promo code to‘g‘ri! 10% chegirma qo‘llandi.");
    } else {
      setDiscount(0);
      toast.error("❌ Promo code noto‘g‘ri!");
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header cart={cart} />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Main />
                  <Categories />
                  <Section addToCart={addToCart} />
                </>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/shop" element={<Store addToCart={addToCart} />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  increase={increase}
                  decrease={decrease}
                  remove={remove}
                  discount={discount}
                  checkoutStep={checkoutStep}
                  setCheckoutStep={setCheckoutStep}
                  applyPromo={applyPromo}
                  setCart={setCart}
                  setDiscount={setDiscount}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
};

export default App;