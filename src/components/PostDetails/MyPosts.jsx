import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getPostsByUser, deletePost } from "../../services/postService";
import { getCurrentUser } from "../../utils/auth";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsByUser();
        if (res.success) {
          setPosts(res.posts);
        }
      } catch (error) {
        console.error("Failed to fetch user's posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deletePost(id);
      if (res.success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  if (loading) {
    return (
      <div className="text-white pt-24 text-center">Loading your posts...</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-white pt-24 text-center">You have no posts yet.</div>
    );
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
        >
          My <span className="text-yellow-300">Posts</span>
        </motion.h1>

        {posts.length === 0 ? (
          <p className="text-center text-white/70">
            You haven't posted anything yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-bold text-yellow-300">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-white/80 line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => navigate(`/edit-post/${blog._id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-300 text-indigo-900 font-semibold rounded hover:bg-yellow-400 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPosts;
