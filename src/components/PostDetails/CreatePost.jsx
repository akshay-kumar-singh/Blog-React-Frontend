import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { getCurrentUser } from "../../utils/auth";
import toast from "react-hot-toast";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/"); // redirect to login if not authenticated
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        await createPost(title, content, base64Image);

        toast.success("Post created successfully!");
        navigate("/");
      };
    } catch (error) {
      console.error("Create post error:", error.message);
      toast.error("Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-lg shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">
          Create a New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Content</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white h-40 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-300 text-indigo-900 font-bold rounded hover:bg-yellow-400 transition-all duration-300"
            disabled={!title || !content || !image || loading}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
