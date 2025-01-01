import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import DashboardCard from "./DashboardCard";

function Dashboard() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know who <strong className="purple">we are</strong>
            </h1>
            <DashboardCard/>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Dashboard;
