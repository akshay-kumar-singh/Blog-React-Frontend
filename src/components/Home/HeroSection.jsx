import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts } from "../../services/postService";
const Hero = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllPosts();
        if (res.success) {
          setBlogs(res.posts);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
        >
          Latest <span className="text-yellow-300">Blogs</span>
        </motion.h1>

        {blogs.length === 0 ? (
          <p className="text-center text-white/70">No blog posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/post/${blog._id}`)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-yellow-300 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-white/80 line-clamp-3">
                    {blog.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-300">
                    By: {blog.author?.name || "Anonymous"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
