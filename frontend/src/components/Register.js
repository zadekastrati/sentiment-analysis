import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./RegisterPage.css"; 

const Register = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Handle navigation if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Submitting data:", formData); // Log form data

    // Basic validation check
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      console.log("Making POST request to register...");
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", 
        formData, 
        {
          headers: {
            "Content-Type": "application/json",  // Specify JSON content type
          },
        }
      );
  
      setError("");  // Clear error before showing success message
      alert(response.data.message);
  
      // If `toggleForm` is provided, use it; otherwise, navigate to the login page
      if (toggleForm) {
        toggleForm(); // Switch to the login form
      } else {
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "An error occurred.");
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        {toggleForm ? (
          <button onClick={toggleForm} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>
            Login
          </button>
        ) : (
          <a href="/login">Login</a>
        )}
      </p>
    </div>
  );
};

export default Register;
