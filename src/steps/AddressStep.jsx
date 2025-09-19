import { useState } from "react";

export default function AddressStep({ onBack, onNext }) {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      name: "2118 Thornridge",
      details: "2118 Thornridge Cir, Syracuse, Connecticut 35624",
      phone: "(209) 555-0104",
    },
    {
      id: 2,
      label: "Office",
      name: "Headoffice",
      details: "2715 Ash Dr, San Jose, South Dakota 83475",
      phone: "(704) 555-0127",
    },
  ]);

  const [selected, setSelected] = useState(1);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    name: "",
    details: "",
    phone: "",
  });

  
  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  
  const handleEdit = (id, currentName) => {
    setIsEditing(id);
    setEditValue(currentName);
  };

  
  const saveEdit = () => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === isEditing ? { ...addr, name: editValue } : addr
      )
    );
    setIsEditing(null);
    setEditValue("");
  };

  
  const handleAddNew = () => {
    if (!newAddress.label || !newAddress.name || !newAddress.details || !newAddress.phone) {
      alert("❌ Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    const newId = addresses.length ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    setAddresses([...addresses, { id: newId, ...newAddress }]);
    setNewAddress({ label: "", name: "", details: "", phone: "" });
    setIsAdding(false);
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col p-10">
     
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-lg">
            1
          </span>
          <span className="font-semibold text-lg">Address</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-10 h-10 flex items-center justify-center rounded-full border text-lg">
            2
          </span>
          <span className="text-lg">Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="w-10 h-10 flex items-center justify-center rounded-full border text-lg">
            3
          </span>
          <span className="text-lg">Payment</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-8">Select Address</h2>

      
      <div className="space-y-6 flex-1 overflow-y-auto">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className="flex items-center justify-between p-6 border rounded-lg cursor-pointer hover:shadow-md bg-white"
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                checked={selected === addr.id}
                onChange={() => setSelected(addr.id)}
              />
              <div>
                {isEditing === addr.id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded px-3 py-2"
                    />
                    <button
                      onClick={saveEdit}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="font-medium text-lg">
                    {addr.name}
                    <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded">
                      {addr.label}
                    </span>
                  </p>
                )}
                <p className="text-sm text-gray-600">{addr.details}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
              </div>
            </div>
            <div className="flex gap-3 text-gray-500 text-xl">
              <button onClick={() => handleEdit(addr.id, addr.name)}>✎</button>
              <button onClick={() => handleDelete(addr.id)}>×</button>
            </div>
          </label>
        ))}
      </div>

      
      {isAdding ? (
        <div className="mt-6 p-6 border rounded-lg bg-white shadow space-y-4">
          <input
            type="text"
            placeholder="Label (Home, Office...)"
            value={newAddress.label}
            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Details"
            value={newAddress.details}
            onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-4">
            <button
              onClick={handleAddNew}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Address
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="block mx-auto mt-8 text-base text-gray-700 hover:underline"
        >
          + Add New Address
        </button>
      )}

     
      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="px-8 py-3 border rounded-lg text-lg">
          Back
        </button>
        <button
          onClick={() => {
            const selectedAddress = addresses.find((a) => a.id === selected);
            console.log("✅ Selected Address:", selectedAddress);
            onNext();
          }}
          className="px-8 py-3 bg-black text-white rounded-lg text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
