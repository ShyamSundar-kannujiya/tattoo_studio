import React, { useState } from "react";
import { User, Mail, Phone, CalendarDays, PenTool } from "lucide-react";
import api from "../api/axios"; 

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tattooStyle: "",
    appointmentDate: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ FINAL SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData);

    try {
      const res = await api.post("/appointments", formData);

      console.log("SUCCESS:", res.data);

      alert("✅ Appointment booked successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        tattooStyle: "",
        appointmentDate: "",
        message: "",
      });
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);

      alert("❌ Failed to book appointment. Try again.");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
            Book Your <span className="text-red-500">Appointment</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Fill out the form below and our artist will contact you soon.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute top-4 left-4 text-red-500" size={20} />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-4 left-4 text-red-500" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute top-4 left-4 text-red-500" size={20} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
            />
          </div>

          {/* Tattoo Style */}
          <div className="relative">
            <PenTool className="absolute top-4 left-4 text-red-500" size={20} />
            <input
              type="text"
              name="tattooStyle"
              placeholder="Tattoo Style / Design Idea"
              value={formData.tattooStyle}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <CalendarDays
              className="absolute top-4 left-4 text-red-500"
              size={20}
            />
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="4"
            placeholder="Describe your tattoo idea..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;
