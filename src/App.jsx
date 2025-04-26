import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/Pages/LandingPage";
import Navbar from "../src/components/Home/Navbar";
import Footer from "../src/components/Home/Footer";
import PostDetails from "./components/PostDetails/PostDetails";
import CreatePost from "./components/PostDetails/CreatePost";
import UpdatePost from "./components/PostDetails/UpdatePost";
import MyPosts from "./components/PostDetails/MyPosts";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<UpdatePost />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
