import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { PlusCircle, Trash2, Edit3, Save, X } from "lucide-react";
import api from "../api/axios";

const BlogEditor = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image: null,
  });

  // Fetch Blogs - CORRECTED endpoint
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // CHANGE: /blogs to /api/blogs
        const res = await api.get("/blogs");
        console.log("Fetched blogs:", res.data);

        // Handle different response structures
        if (res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        } else if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("category", formData.category);
      blogData.append("description", formData.description);
      blogData.append("content", formData.content);

      if (formData.image && typeof formData.image !== "string") {
        blogData.append("image", formData.image);
      }

      let response;
      if (isEditing) {
        // UPDATE - CORRECTED endpoint
        response = await api.put(`/blogs/${currentBlogId}`, blogData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setBlogs(
          blogs.map((blog) =>
            blog._id === currentBlogId
              ? response.data.blog || response.data
              : blog,
          ),
        );
      } else {
        // CREATE - CHANGE endpoint to match your backend
        response = await api.post("/blogs/upload", blogData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const newBlog = response.data.blog || response.data;
        setBlogs([newBlog, ...blogs]);
      }

      resetForm();
      alert(
        isEditing ? "Blog updated successfully!" : "Blog created successfully!",
      );
    } catch (error) {
      console.error("Blog save failed:", error);
      alert(error.response?.data?.message || "Failed to save blog");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      description: blog.description,
      content: blog.content,
      image: blog.image,
    });

    setImagePreview(blog.image);
    setCurrentBlogId(blog._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      // DELETE - CORRECTED endpoint
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete blog");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      content: "",
      image: null,
    });
    setImagePreview(null);
    setIsEditing(false);
    setCurrentBlogId(null);
  };

  if (loading) {
    return (
      <div className="flex bg-black min-h-screen text-white">
        <AdminSidebar />
        <main className="flex-1 lg:ml-72 p-6 md:p-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading blogs...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 p-6 md:p-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold uppercase tracking-widest">
            Blog <span className="text-red-500">Editor</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Create, update, and manage tattoo studio blogs.
          </p>
        </div>

        {/* Blog Form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g., Tattoo Tips, Aftercare)"
                value={formData.category}
                onChange={handleChange}
                required
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <textarea
              name="description"
              rows="3"
              placeholder="Short Description (max 200 chars)"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            <textarea
              name="content"
              rows="8"
              placeholder="Full Blog Content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition"
              >
                {isEditing ? <Save size={18} /> : <PlusCircle size={18} />}
                {isEditing ? "Update Blog" : "Create Blog"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Blog List */}
        {blogs.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p>No blogs yet. Create your first blog above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:border-red-500/50 transition"
              >
                <img
                  src={
                    blog.image &&
                    (blog.image.startsWith("http")
                      ? blog.image
                      : `${import.meta.env.VITE_API_URL}${blog.image}`)
                  }
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="p-6">
                  <span className="text-red-500 uppercase text-sm tracking-wide">
                    {blog.category}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogEditor;
