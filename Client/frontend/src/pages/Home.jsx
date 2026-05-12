import Hero from "../components/Hero";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TestimonialForm from "../components/TestimonialForm";

const Home = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
      fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get("/testimonials");
        setTestimonials(data.testimonials);
      } catch (error) {
        console.log(error);
      }
    };
   
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <Hero />
      {/* About Preview */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <About />
      </section>
      {/* Services Preview */}
      <section className="py-20 px-4 md:px-10 bg-zinc-950">
        <Services />
      </section>
      {/* Featured Portfolio Preview */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                Featured <span className="text-red-500">Portfolio</span>
              </h2>

              <p className="text-gray-400 mt-4 max-w-2xl">
                Explore some of our most iconic tattoo creations designed by
                professional artists.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="mt-6 md:mt-0 flex items-center gap-2 text-red-500 font-semibold uppercase tracking-wide hover:text-white transition"
            >
              View Full Portfolio
              <ArrowRight size={18} />
            </Link>
          </div>

          <Portfolio />
        </div>
      </section>
      {/* Booking CTA */}
      <section className="py-24 px-4 md:px-10 bg-gradient-to-r from-red-600/20 via-black to-black border-y border-red-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 p-5 rounded-2xl shadow-lg">
              <CalendarCheck size={40} />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6">
            Ready To Get <span className="text-red-500">Inkspired?</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Book your custom tattoo consultation today and let our expert
            artists transform your ideas into timeless body art.
          </p>

          <Link
            to="/booking"
            className="inline-block bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-red-500/30 transition-all duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </section>
      {/* Latest Blog Preview */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                Latest <span className="text-red-500">Blogs</span>
              </h2>

              <p className="text-gray-400 mt-4 max-w-2xl">
                Stay updated with tattoo trends, aftercare guides, and design
                inspiration.
              </p>
            </div>

            <Link
              to="/blog"
              className="mt-6 md:mt-0 flex items-center gap-2 text-red-500 font-semibold uppercase tracking-wide hover:text-white transition"
            >
              View All Blogs
              <ArrowRight size={18} />
            </Link>
          </div>

          <Blog />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 md:px-10 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-14">
            Client <span className="text-red-500">Experiences</span>
          </h2>

          {/* TESTIMONIAL CARDS */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg"
                >
                  <p className="text-gray-300 italic mb-6">
                    “{testimonial.review}”
                  </p>

                  <h4 className="text-xl font-bold text-red-500">
                    {testimonial.name}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No reviews yet.</p>
            )}
          </div>
        </div>
        <TestimonialForm />
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6">
            Your Vision. Our <span className="text-red-500">Artistry.</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10">
            Whether it's your first tattoo or your next masterpiece, our studio
            is ready to create something unforgettable.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-white text-black hover:bg-red-600 hover:text-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
