import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav-container ${isOpen ? "open" : ""}`}>
      <GiHamburgerMenu
        size={24}
        className="toggle-icon"
        onClick={toggleSidebar}
      />
      <div className={`sidenav ${isOpen ? "visible" : ""}`}>
        <ul>
          <li>
            <Link to="/profile">Profile</Link> {/* Updated to point to ProfilePage */}
          </li>
          <li>
            <Link to="/dashboard">Users</Link>
          </li>
          <li>
            <Link to="/dashboard">Notifications</Link>
          </li>
          <li>
            <Link to="/dashboard/roles">Roles</Link>
          </li>
          <li>
            <Link to="/dashboard/posts">Posts</Link>
          </li>
          <li>
            <Link to="/dashboard">Feedback</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
