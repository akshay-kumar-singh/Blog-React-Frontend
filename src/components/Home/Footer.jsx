import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold"
            >
              Event<span className="text-yellow-300">Ease</span>
            </motion.h2>
            <p className="text-gray-300 text-sm leading-relaxed">
            Your platform to share ideas, stories, and knowledge. Join a community of passionate writers.
            </p>
            <div className="flex space-x-4">
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-300 hover:text-indigo-900 flex items-center justify-center transition-all duration-300"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-300 hover:text-indigo-900 flex items-center justify-center transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-300 hover:text-indigo-900 flex items-center justify-center transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-300 hover:text-indigo-900 flex items-center justify-center transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-yellow-300">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-yellow-300 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-yellow-300 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Create Post
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-yellow-300 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> My Posts
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-yellow-300 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">→</span> Profile
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-yellow-300">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <MdLocationOn size={20} className="mr-3 mt-1 text-yellow-300" />
                <span>123 Event Avenue, Celebration City, CA 90210</span>
              </li>
              <li className="flex items-center">
                <MdPhone size={20} className="mr-3 text-yellow-300" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MdEmail size={20} className="mr-3 text-yellow-300" />
                <span>hello@eventease.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-yellow-300">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
            Stay updated with the latest blogs and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:border-yellow-300 text-white text-sm placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 font-semibold py-3 px-4 rounded-lg hover:from-yellow-300 hover:to-yellow-200 transition-all duration-300"
              >
                {subscribed ? "Thank you! ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 EventEase. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="hover:text-yellow-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-yellow-300 transition-colors"
            >
              Terms of Service
            </a>
            <a href="/faq" className="hover:text-yellow-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
