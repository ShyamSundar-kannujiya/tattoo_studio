import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('./contact-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
            Let's bring your tattoo vision to life. Reach out to our expert
            artists today.
          </p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto py-24 px-6 text-center gap-16">
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-bold mb-8 border-b border-red-600 pb-4 inline-block">
              Contact Information
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg">
              Whether you're ready for your next masterpiece or just have
              questions, our team is here to help you every step of the way.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="flex items-start gap-5 bg-zinc-950 p-6 rounded-xl border border-white/5">
              <FaMapMarkerAlt className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-xl">Studio Address</h4>
                <p className="text-gray-400">Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="flex items-start gap-5 bg-zinc-950 p-6 rounded-xl border border-white/5">
              <FaPhoneAlt className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-xl">Phone Number</h4>
                <p className="text-gray-400">+91 88748 81670</p>
              </div>
            </div>

            <div className="flex items-start gap-5 bg-zinc-950 p-6 rounded-xl border border-white/5">
              <FaEnvelope className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-xl">Email Address</h4>
                <p className="text-gray-400">info@ratattoo.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5 bg-zinc-950 p-6 rounded-xl border border-white/5">
              <FaWhatsapp className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-xl">
                  <a
                    href="https://wa.me/918874881670"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </h4>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Follow Us</h3>

            <div className="flex gap-4 justify-center">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full h-[500px] border-t border-white/5">
        <iframe
          title="India"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          className="w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
