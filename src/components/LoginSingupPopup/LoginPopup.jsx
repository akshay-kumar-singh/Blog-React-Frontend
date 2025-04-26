import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPopup = ({ toggleForm, closeModal, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await loginUser(email, password);
      toast.success("Logged in successfully!");
      onLoginSuccess(email);
      navigate("/choose-event");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white p-6 rounded-3xl max-w-3xl w-full mx-auto"
    >
      <button
        onClick={closeModal}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500 text-xl z-20"
        aria-label="Close"
      >
        <FaTimes />
      </button>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500">
          Sign in to continue your journey with EventEase
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6 relative z-10">
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 transition-all duration-300"
            required
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="relative">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 transition-all duration-300"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Sign In"
          )}
        </motion.button>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          New to EventEase?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            onClick={toggleForm}
            className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-semibold"
          >
            Create an account
          </motion.span>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPopup;
