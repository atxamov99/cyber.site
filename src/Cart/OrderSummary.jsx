import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderSummary({ subtotal, tax, shipping, onCheckout }) {
  const [promo, setPromo] = useState("");
  const [bonus, setBonus] = useState("");
  const total = subtotal + tax + shipping;

  const handleApply = () => {
    if (promo.toLowerCase() === "cyber10") {
      toast.success("✅ Promo code to‘g‘ri! 10% chegirma qo‘llandi.");
    } else {
      toast.error("❌ Promo code noto‘g‘ri!");
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

      <input
        type="text"
        placeholder="Discount code / Promo code"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Your bonus card number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleApply}
          className="bg-black text-white px-4 rounded"
        >
          Apply
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping & Handling</span>
          <span>${shipping}</span>
        </div>
        <div className="flex justify-between font-semibold text-black text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      
      <button
        onClick={onCheckout}
        className="w-full mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Checkout
      </button>
    </div>
  );
}
