import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Posts from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import PostDetails from "./components/Projects/PostDetails";
import Roles from "./components/Dashboard/Roles";
import Post from "./components/Dashboard/Posts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="*" element={<Navigate to="/"  />} />
          <Route path="/dashboard/roles" element={<Roles />} />
          <Route path="/dashboard/posts" element={<Post />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
