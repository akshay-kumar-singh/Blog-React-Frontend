import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
const PostDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        if (res.success) {
          setBlog(res.post);
        }
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-white pt-24 text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-white pt-24 text-center">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 text-white pt-24 px-6 pb-16">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 p-8 rounded-lg shadow-xl">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-yellow-300 mb-4">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-300 mb-2">
          By: {blog.author?.name || "Unknown"} |{" "}
          {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="text-white leading-relaxed whitespace-pre-line mt-6">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
