import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-300">Crossroads</h2>
          <p className="text-gray-300 text-sm">
            Share your ideas, stories, and passion with the world.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="/" className="hover:text-yellow-300">
              <FaFacebook size={20} />
            </a>
            <a href="/" className="hover:text-yellow-300">
              <FaInstagram size={20} />
            </a>
            <a href="/" className="hover:text-yellow-300">
              <FaTwitter size={20} />
            </a>
            <a href="/" className="hover:text-yellow-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/" className="hover:text-yellow-300">Create Post</a></li>
            <li><a href="/" className="hover:text-yellow-300">My Posts</a></li>
            <li><a href="/" className="hover:text-yellow-300">Profile</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center">
              <MdLocationOn className="mr-2 text-yellow-300" />
              123 Blogger Lane, Creativity City
            </li>
            <li className="flex items-center">
              <MdPhone className="mr-2 text-yellow-300" />
              +91-9123119624
            </li>
            <li className="flex items-center">
              <MdEmail className="mr-2 text-yellow-300" />
              akshaysing975@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© 2025 Crossroads. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/" className="hover:text-yellow-300">Privacy Policy</a>
          <a href="/" className="hover:text-yellow-300">Terms of Service</a>
          <a href="/" className="hover:text-yellow-300">FAQ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
