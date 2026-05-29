import React, { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Black & Grey",
  "Fine Line",
  "Traditional",
  "Lettering",
  "Color",
  "Coverup",
  "Realistic",
  "Piercing",
];

const Portfolio = () => {
  // STATES
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // FETCH PORTFOLIO DATA
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio`)
      .then((res) => res.json())
      .then((data) => setPortfolioItems(data))
      .catch((err) => console.log(err));
  }, []);

  // FILTER
  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="min-h-screen bg-black text-white py-20 px-4 md:px-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest">
          Our <span className="text-red-500">Portfolio</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Explore our finest tattoo masterpieces crafted with creativity,
          precision, and passion.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full uppercase tracking-wide font-semibold transition-all duration-300
              ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-red-600 hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-96 object-contain bg-black group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-center p-6">
              <span className="text-red-500 uppercase text-sm tracking-wider mb-2">
                {item.category}
              </span>

              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

              <button
                onClick={() => setSelectedImage(item.image)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold uppercase tracking-wide transition-all duration-300"
              >
                <Eye size={18} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition"
          >
            <X size={40} />
          </button>

          <img
            src={selectedImage}
            alt="Tattoo Preview"
            className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl object-contain"
          />
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mt-24 text-center bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-lg">
        <h3 className="text-4xl font-bold uppercase mb-4">
          Ready for Your Own Masterpiece?
        </h3>

        <p className="text-gray-400 mb-8">
          Let our artists bring your vision to life with custom tattoo artistry.
        </p>

        <Link to="/booking" >
        <button className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300">
            Book Now
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
