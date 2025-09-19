import React, { useState } from "react";
import OrderSummary from "../Cart/OrderSummary";

export default function PaymentStep({ total, onFinish, onBack }) {
  const [method, setMethod] = useState("card");

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col p-10">
      
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 flex items-center justify-center rounded-full border">1</span>
          <span>Address</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 flex items-center justify-center rounded-full border">2</span>
          <span>Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm">3</span>
          <span className="font-semibold">Payment</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Choose Payment Method</h2>

      
      <div className="space-y-4 flex-1">
        <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer bg-white hover:shadow">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <span className="font-medium">Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer bg-white hover:shadow">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={method === "paypal"}
            onChange={() => setMethod("paypal")}
          />
          <span className="font-medium">PayPal</span>
        </label>
      </div>

      
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <OrderSummary subtotal={total} tax={0} shipping={0} onCheckout={onFinish} />
      </div>

     
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 border rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
      </div>
    </div>
  );
}
