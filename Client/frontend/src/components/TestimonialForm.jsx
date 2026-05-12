import React, { useState } from "react";
import api from "../api/axios";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/testimonials", formData);

      alert("Review Submitted Successfully");

      setFormData({
        name: "",
        review: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 uppercase">
          Leave a <span className="text-red-500">Review</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-white/10 text-white outline-none"
          />

          <textarea
            name="review"
            placeholder="Write Your Review"
            rows="5"
            value={formData.review}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-white/10 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold uppercase"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default TestimonialForm;
