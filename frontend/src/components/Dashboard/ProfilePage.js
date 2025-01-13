import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Pencil icon from react-icons
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [editField, setEditField] = useState(null); // Track which field is being edited
  const [updatedValue, setUpdatedValue] = useState(""); // Track updated value
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Get user from localStorage

  const logout = () => {
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };

  const handleEdit = (field) => {
    setEditField(field); // Set the field to be edited
    setUpdatedValue(user[field]); // Pre-fill input with current value
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/auth/user/${user.user_id}`,
        { [editField]: updatedValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local storage and state
      const updatedUser = { ...user, [editField]: updatedValue };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditField(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setEditField(null); // Cancel editing
    setUpdatedValue(""); // Reset updated value
  };

  return (
    <div className="profile-container container mt-5">
      <h1 className="text-center mb-4">Profile Page</h1>

      {user ? (
        <div className="row">
          {/* Username Column */}
          <div className="col-md-6">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Username</h5>
                {editField === "username" ? (
                  <>
                    <button onClick={handleSave} className="btn btn-success btn-sm">
                      Save
                    </button>
                    <button onClick={handleCancel} className="btn btn-secondary btn-sm ms-2">
                      Cancel
                    </button>
                  </>
                ) : (
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit("username")}
                  />
                )}
              </div>
              {editField === "username" ? (
                <input
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="form-control mt-2"
                />
              ) : (
                <p className="mt-2">{user.username}</p>
              )}
            </div>
          </div>

          {/* Email Column */}
          <div className="col-md-6">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Email</h5>
                {editField === "email" ? (
                  <>
                    <button onClick={handleSave} className="btn btn-success btn-sm">
                      Save
                    </button>
                    <button onClick={handleCancel} className="btn btn-secondary btn-sm ms-2">
                      Cancel
                    </button>
                  </>
                ) : (
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit("email")}
                  />
                )}
              </div>
              {editField === "email" ? (
                <input
                  type="email"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="form-control mt-2"
                />
              ) : (
                <p className="mt-2">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No user data found. Please log in again.</p>
      )}

      {/* Logout Button */}
      <div className="text-center mt-4">
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
