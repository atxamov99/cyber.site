import { useState } from "react";

export default function ShippingStep({ onBack, onNext }) {
  const [selected, setSelected] = useState("free");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col p-10">
      
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 flex items-center justify-center rounded-full border">1</span>
          <span>Address</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm">2</span>
          <span className="font-semibold">Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-8 h-8 flex items-center justify-center rounded-full border">3</span>
          <span>Payment</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Choose Shipment Method</h2>

     
      <div className="flex-1 space-y-6 overflow-y-auto">
       
        <label className="flex justify-between items-center p-6 border rounded-lg cursor-pointer hover:shadow bg-white">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selected === "free"}
              onChange={() => setSelected("free")}
            />
            <div>
              <p className="font-medium">Free <span className="ml-2 text-gray-500">Regular shipment</span></p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">17 Oct, 2023</p>
        </label>

        
        <label className="flex justify-between items-center p-6 border rounded-lg cursor-pointer hover:shadow bg-white">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selected === "fast"}
              onChange={() => setSelected("fast")}
            />
            <div>
              <p className="font-medium">$8.50 <span className="ml-2 text-gray-500">Get your delivery as soon as possible</span></p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">1 Oct, 2023</p>
        </label>

       
        <label className="flex justify-between items-center p-6 border rounded-lg cursor-pointer hover:shadow bg-white">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selected === "schedule"}
              onChange={() => setSelected("schedule")}
            />
            <div>
              <p className="font-medium">Schedule <span className="ml-2 text-gray-500">Pick a date for delivery</span></p>
            </div>
          </div>
          {selected === "schedule" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          )}
        </label>
      </div>

      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 border rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={() => {
            console.log("Selected shipping:", selected);
            if (selected === "schedule") {
              console.log("Scheduled date:", selectedDate);
            }
            onNext();
          }}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
