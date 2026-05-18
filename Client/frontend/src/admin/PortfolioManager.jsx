import React, { useEffect, useState } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import { ImagePlus, Trash2 } from "lucide-react";

const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });

  /* =========================
      FETCH PORTFOLIO
  ========================= */
  const fetchPortfolio = async () => {
    try {
      const res = await api.get("/portfolio");
      setPortfolio(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  /* =========================
      HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  /* =========================
      UPLOAD PORTFOLIO
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await api.post("/portfolio/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      alert("Portfolio uploaded successfully");

      setFormData({
        title: "",
        category: "",
        image: null,
      });

      fetchPortfolio();
    } catch (error) {
      console.log("UPLOAD ERROR:", error.response || error);
    }
  };

  /* =========================
      DELETE PORTFOLIO
  ========================= */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/portfolio/${id}`);

      fetchPortfolio();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 p-6 md:p-10">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-[6px]">
            Portfolio <span className="text-red-500">Editor</span>
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Upload, manage, and showcase your tattoo portfolio.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title + Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Portfolio Title"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-500"
              >
                <option value="">Select Category</option>

                {/* Existing Categories from DB */}
                {[...new Set(portfolio.map((item) => item.category))]
                  .filter(Boolean)
                  .map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}

                {/* Default Categories */}
                <option value="Black & Grey">Black & Grey</option>
                <option value="Fine Line">Fine Line</option>
                <option value="Traditional">Traditional</option>
                <option value="Japanese">Japanese</option>
                <option value="Lettering">Lettering</option>
                <option value="Color">Color</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="text-gray-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300"
            >
              <ImagePlus size={20} />
              Upload Portfolio
            </button>
          </form>
        </div>

        {/* Portfolio List */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <img
                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `${import.meta.env.VITE_API_URL}${item.image}`
                }
                alt={item.title}
                className="w-full h-80 object-contain bg-black"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              {/* Content */}
              <div className="p-6">
                <span className="text-red-500 uppercase text-sm tracking-widest">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold mt-3 mb-5">{item.title}</h3>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
