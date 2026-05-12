import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`); 
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const blogsArray = Array.isArray(data)
          ? data
          : data.blogs || data.data || data.posts || [];
        setBlogs(blogsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Agar loading ya error ho to
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white py-20 px-4 md:px-10">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-widest">
          Tattoo <span className="text-red-500">Blog</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg">
          Explore expert tattoo insights, latest trends, design inspiration, and
          professional aftercare advice from our studio artists.
        </p>
      </div>

      {/* Featured Blog – agar backend se kisi blog ko featured karna ho to dynamic bana sakte ho, abhi static rakha hai */}
      {/* <div className="max-w-7xl mx-auto mb-20">
        <div className="relative rounded-3xl overflow-hidden group shadow-2xl">
          <img
            src="/featured-blog.jpg"
            alt="Featured Blog"
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 md:p-16">
            <span className="bg-red-600 w-fit px-4 py-2 rounded-full uppercase text-sm font-semibold tracking-wide mb-4">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Evolution of Modern Tattoo Art
            </h2>
            <p className="text-gray-300 max-w-2xl mb-6">
              Explore how tattoo artistry has transformed from traditional
              methods into cutting-edge creative expression.
            </p>
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-bold uppercase tracking-wider w-fit transition-all duration-300">
              Read Full Article
            </button>
          </div>
        </div>
      </div> */}

      {/* Blog Grid – backend se aaye blogs yaha show honge */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold uppercase mb-10 border-l-4 border-red-500 pl-4">
          Latest Articles
        </h3>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No blogs found. Please check back later.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                image={blog.image || "/placeholder.jpg"} // fallback image
                title={blog.title}
                description={blog.content} // backend se 'content' aa raha hai
                date={blog.date}
                category={blog.category || "General"} // agar category ho to
              />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-5xl mx-auto mt-24 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 text-center">
        <h3 className="text-4xl font-bold mb-4 uppercase">Stay Updated</h3>
        <p className="text-gray-400 mb-8">
          Subscribe for tattoo inspiration, studio news, and exclusive offers.
        </p>
        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 w-full md:w-96 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
