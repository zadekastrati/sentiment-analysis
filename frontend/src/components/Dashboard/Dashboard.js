import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom"; 
import Particle from "../Particle";
import SideNavbar from "./SideNav";
import Posts from "./Posts";
import Roles from "./Roles";
import Notifications from "./Notifications";

function Dashboard() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <SideNavbar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/dashboard" element={<h2>Dashboard Home</h2>} />
          <Route path="/dashboard/posts" element={<Posts />} />
          <Route path="/dashboard/roles" element={<Roles />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Container>
  );
}

export default Dashboard;
