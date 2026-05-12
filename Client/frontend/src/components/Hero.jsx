import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StatCounter from "../Function/counter.jsx";
import { Gem, Smile, CalendarCheck, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO MAIN SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28">
        <img
          src="./tattoo.png"
          className="h-20 w-20 md:h-28 md:w-28 object-contain mb-6"
          alt="Tattoo Studio Logo"
        />

        <h1 className="text-4xl md:text-8xl font-bold uppercase tracking-wide leading-tight">
          Your Ideas <span className="text-red-500">Our Creativity</span>
        </h1>

        <p className="text-gray-300 text-sm md:text-xl mt-6 mb-10 max-w-3xl leading-relaxed">
          We don't just ink skin — we transform your deepest thoughts and
          wildest imaginations into permanent masterpieces of art.
        </p>

        <motion.div
          className="flex flex-col md:flex-row gap-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link
            to="/booking"
            className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-red-500/30"
          >
            Book Now
          </Link>

          <Link
            to="/services"
            className="border border-white/20 hover:border-red-500 hover:text-red-500 px-10 py-4 rounded-full font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Our Services
          </Link>
        </motion.div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Custom Designs",
              text: "Unique tattoo concepts crafted exclusively for your personality and story.",
            },
            {
              title: "Personalized Ink",
              text: "Tailor-made body art designed to reflect your journey and identity.",
            },
            {
              title: "Sterile Equipment",
              text: "Safe, hygienic, and professional tattoo sessions with sterilized tools.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-black/40 border border-white/5 rounded-3xl p-8 hover:border-red-500/20 transition-all duration-300"
            >
              <img
                src="./tattoo.png"
                alt={card.title}
                className="rounded-xl w-full h-52 object-cover mb-6"
              />

              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>

              <p className="text-gray-400 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img
            src="./tattoo.png"
            alt="Tattoo Art"
            className="rounded-2xl w-full object-cover"
          />

          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-4 border-b-4 border-red-500"></div>
        </div>

        <div>
          <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm">
            About UP50 Studio
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-6 leading-tight">
            Creating Impossible <br />
            Tattoo Arts
          </h2>

          <p className="text-gray-400 mb-10 leading-relaxed text-lg">
            We transform bold imagination into extraordinary ink—crafting
            tattoos once thought impossible, now made timeless.
          </p>

          <div className="bg-zinc-950 rounded-3xl p-10 grid grid-cols-2 gap-8">
            <StatCounter target={10} label="Years Experience" />
            <StatCounter target={1} label="Best Artists" />
            <StatCounter target={700} label="Tattoo Artworks" />
            <StatCounter target={99} label="Positive Reviews" />
          </div>
        </div>
      </section>

      {/* DISCOUNT CTA */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed brightness-[0.25] grayscale"
          style={{
            backgroundImage: "url('./AboutUs.png')",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h4 className="text-red-500 italic text-xl mb-4">
            First Tattoo Offer
          </h4>

          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Get <span className="text-red-500">50% Off</span> Your First Tattoo
          </h2>

          <p className="text-gray-300 mt-6 mb-10">
            Limited time offer with terms & conditions applied.
          </p>

          <Link
            to="/booking"
            className="inline-block bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
          >
            Claim Offer
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h4 className="text-red-500 italic text-lg">Why Choose Us</h4>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Fine Line Art With Your Body
            </h2>

            <p className="text-gray-400 text-lg">
              Elegant fine line tattoos crafted with precision, transforming
              minimal detail into powerful personal art.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <img src="./choose.png" className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-bold">
                    Professional Tattoo Studio
                  </h3>
                  <p className="text-gray-400 mt-2">
                    World-class artistry with safety and creativity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Gem className="text-red-500 mt-1" />
                <div>
                  <h3 className="text-xl font-bold">Unique Tattoo Designs</h3>
                  <p className="text-gray-400 mt-2">
                    Personalized concepts for every client.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Smile className="text-red-500 mt-1" />
                <div>
                  <h3 className="text-xl font-bold">Affordable Price</h3>
                  <p className="text-gray-400 mt-2">
                    Premium art at accessible pricing.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full hover:border-red-500 hover:text-red-500 transition-all duration-300 uppercase tracking-wider"
            >
              Learn More
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative">
            <img
              src="./t20.png"
              alt="Tattoo Work"
              className="rounded-3xl grayscale"
            />
          </div>
        </div>
      </section>

      {/* FINAL BOOKING CTA */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h4 className="text-red-500 italic text-lg mb-4">Appointment</h4>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready For Your Dream Tattoo?
            </h2>

            <p className="text-gray-400 mt-6 text-lg max-w-2xl">
              Our expert artists are ready to transform your vision into
              reality.
            </p>
          </div>

          <Link
            to="/booking"
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-10 py-5 rounded-full font-bold uppercase tracking-wider transition-all duration-300"
          >
            <CalendarCheck size={22} />
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
