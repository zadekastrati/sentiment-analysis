import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after login

const Login = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      console.log("Submitting login data:", formData); // Debugging log
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
        }
      );

      alert("Login successful!"); // Success message
      localStorage.setItem("token", response.data.token); // Save token in localStorage
      navigate("/"); // Redirect to the home page
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="login-form"
      style={{
        marginTop: "150px", // Add spacing to push the form lower
        textAlign: "center", // Center align the form
      }}
    >
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            display: "block",
            margin: "10px auto", // Add spacing between inputs
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
          }}
        />
        <button
          type="submit"
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <button
          onClick={toggleForm}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;