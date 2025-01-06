import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user data from storage
    localStorage.removeItem("user"); // If you are using localStorage to store user data
    sessionStorage.removeItem("user"); // Clear session data if applicable
    // Redirect to login page
    navigate("/login");
  };

  // Mock user data for display
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
