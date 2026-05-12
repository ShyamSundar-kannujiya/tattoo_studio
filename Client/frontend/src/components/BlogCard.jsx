import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const BlogCard = ({ id, image, title, description, date, category }) => {
  return (
    <div className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Blog Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {category}
          </span>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <CalendarDays size={16} className="mr-2 text-red-500" />
          {date}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>

        {/* Read More */}
        <Link
          to={`/blog/${id}`}
          className="flex items-center gap-2 text-red-500 font-semibold uppercase tracking-wide hover:text-white transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;