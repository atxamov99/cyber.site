import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("⚠️ Please enter a valid email.");
      return;
    }

    console.log("Form Submitted: ", formData);
    setStatus("✅ Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 space-y-8 animate-fade-in">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg">
            Have questions or feedback?  
            Fill in the form and we’ll get back to you soon.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-left text-gray-200 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-left text-gray-200 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-left text-gray-200 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200 resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition duration-200"
          >
            Send Message
          </button>

          {/* Status */}
          {status && (
            <p className="text-center mt-6 font-medium text-green-400 animate-fade-in">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;