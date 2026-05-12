const Services = () => {
    return (
      <div>
        <section id="OurWorks" className="bg-black py-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h4 className="text-red-500 italic font-serif text-lg mb-2">
                Our Portfolio
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                Explore Our Works
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Image Card 1 */}
              <div className="relative group h-[400px] overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src="./AboutUs.png"
                  alt="Work 1"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                    Style Name
                  </span>
                  <h3 className="text-white text-2xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                    Realistic Tattoo
                  </h3>
                </div>
              </div>

              {/* Image Card 2 */}
              <div className="relative group h-[400px] overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src="./tattoo.png"
                  alt="Work 2"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                    Style Name
                  </span>
                  <h3 className="text-white text-2xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                    Black & Gray
                  </h3>
                </div>
              </div>

              {/* Image Card 3 */}
              <div className="relative group h-[400px] overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src="./tattoo.png"
                  alt="Work 3"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                    Style Name
                  </span>
                  <h3 className="text-white text-2xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                    Cover-Up
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Services;