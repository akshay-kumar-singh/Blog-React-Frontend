import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, getPostById } from "../../services/postService";
import { getCurrentUser } from "../../utils/auth";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        if (res.success) {
          setTitle(res.post.title);
          setContent(res.post.content);
          setPreview(res.post.coverImage);
        }
      } catch (error) {
        console.error("Failed to load post data", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        title,
        content,
        coverImage: preview,
      };

      const res = await updatePost(id, updatedData);

      if (res.success) {
        navigate("/my-posts");
      }
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-lg shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">
          Update Blog Post
        </h1>
        <form onSubmit={handleUpdate} className="space-y-6">
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
            <label className="block mb-2 font-semibold">
              Change Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300"
            />
            {preview && (
              <img
                src={preview}
                alt="Cover Preview"
                className="mt-4 w-full h-60 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-300 text-indigo-900 font-bold rounded hover:bg-yellow-400 transition-all duration-300"
            disabled={!title || !content}
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
