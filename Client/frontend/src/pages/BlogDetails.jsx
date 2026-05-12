import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`);

        const data = await response.json();

        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[500px] object-contain rounded-2xl mb-8"
        />

        <p className="text-red-500 uppercase mb-2">{blog.category}</p>

        <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>

        <p className="text-gray-400 mb-8">{blog.date}</p>

        <div className="text-lg text-gray-300 leading-9">{blog.content}</div>
      </div>
    </section>
  );
};

export default BlogDetails;
