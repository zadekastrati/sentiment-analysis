import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Posts from "./components/Projects/Projects";
import Register from "./components/Register"; // Import the Register component
import Login from "./components/Login"; // Import the Login component
import PostDetails from "./components/Projects/PostDetails";
import Roles from "./components/Dashboard/Roles";
import Post from "./components/Dashboard/Posts";
import ProfilePage from "./components/Dashboard/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";


import Notifications from "./components/Dashboard/Notifications";
import ContactUs from "./components/Dashboard/ContactUs";
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
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/contactus" element={<ContactUs />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
