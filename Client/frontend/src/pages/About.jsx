import StatCounter from "../Function/counter"; 

const About = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* SECTION 1: Page Header (Hero) */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat grayscale md:bg-fixed"
          style={{
            backgroundImage: "url('./AboutUs.png')",
            backgroundPosition:
              window.innerWidth < 700 ? "center top" : "center 100%",
            filter: "brightness(30%) grayscale(100%)",
          }}
        ></div>

        <div className="relative z-10 text-center space-y-4 px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.3em] font-bold">
            <span className="text-gray-400">Home</span>
            <span className="text-red-600 font-black text-lg">•</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Detailed About with Counters */}
      <section
        id="AboutDetails"
        className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* Left Side: Images with Decorative Border */}
        <div className="relative">
          <div className="relative z-10 rounded-lg overflow-hidden border-8 border-zinc-900">
            <img
              src="./tattoo.png"
              alt="Tattoo Studio"
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Decorative Orange Box */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-8 border-b-8 border-orange-500 -z-0"></div>
        </div>

        {/* Right Side: Text Content */}
        <div className="space-y-6">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Our Story & Vision
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Creating Impossible <br /> Tattoo Arts Since 2015
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Ratattoo Studio Lucknow ka ek premier destination hai jahan art aur
            safety ka perfect blend milta hai. Hum sirf tattoo nahi banate,
            balki aapki memories aur emotions ko skin par utarte hain.
          </p>

          {/* Dynamic Counters Block */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <StatCounter target={10} label="Years Experience" />
            <StatCounter target={1} label="Best Artists" />
            <StatCounter target={700} label="Tattoo Artworks" />
            <StatCounter target={99} label="Positive Reviews" />
          </div>
        </div>
      </section>

      {/* SECTION 3: Mission & Quality CTA */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-serif italic text-red-500">
            "Art is a permanent memory"
          </h3>
          <p className="text-xl text-gray-300 italic">
            Hamara mission har client ko ek unique aur safe environment provide
            karna hai. Hum industry ke best standards aur hygiene protocols
            follow karte hain.
          </p>
          <div className="pt-4">
            <button className="bg-white text-black font-bold py-4 px-10 uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all duration-300">
              Work With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
