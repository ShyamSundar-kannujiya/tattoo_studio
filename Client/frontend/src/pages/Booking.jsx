import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import { ShieldCheck, Brush, Clock3, Star } from "lucide-react";

const Booking = () => {
  const features = [
    {
      icon: <Brush size={32} />,
      title: "Custom Tattoo Design",
      description:
        "Work directly with our expert artists to create a tattoo that reflects your personality.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Safe & Hygienic",
      description:
        "Professional-grade sterilization and safety standards for every session.",
    },
    {
      icon: <Clock3 size={32} />,
      title: "Flexible Scheduling",
      description:
        "Choose appointment times that fit your lifestyle and availability.",
    },
    {
      icon: <Star size={32} />,
      title: "Premium Experience",
      description:
        "Get world-class artistry with comfort, professionalism, and creativity.",
    },
  ];

  return (
    <section className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      {/* <div
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/booking-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest">
            Book Your <span className="text-red-500">Tattoo Session</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
            Transform your ideas into timeless body art with our experienced
            tattoo professionals.
          </p>
        </div>
      </div> */}

      {/* Why Book With Us */}
      <div className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold uppercase">
            Why Choose <span className="text-red-500">Our Studio</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We combine creativity, hygiene, and professionalism to give you
            unforgettable tattoo experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-lg hover:border-red-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-red-500 flex justify-center mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Form */}
      <AppointmentForm />

      {/* Booking Policy */}
      <div className="py-20 px-4 md:px-10 max-w-5xl mx-auto text-center">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-lg">
          <h3 className="text-3xl md:text-4xl font-bold uppercase mb-6">
            Booking Policy
          </h3>

          <ul className="space-y-4 text-gray-300 text-left max-w-3xl mx-auto">
            <li>• A deposit may be required to confirm your booking.</li>
            <li>• Please arrive 15 minutes before your scheduled session.</li>
            <li>• Rescheduling requires at least 24-hour notice.</li>
            <li>
              • Consultation sessions are available before final design
              approval.
            </li>
            <li>• Bring valid ID for verification purposes.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Booking;
