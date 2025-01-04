import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import Particle from "../Particle";
import SideNav from "./SideNav";
import RoleCard from "./RoleCard";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({ title: "" });
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { title, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const fetchRoles = () => {
    fetch("http://localhost:5000/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((err) => console.error("Error fetching roles:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editRole
      ? `http://localhost:5000/api/roles/${editRole.id}`
      : "http://localhost:5000/api/roles";
    const method = editRole ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    })
      .then((res) => res.json())
      .then((updatedRole) => {
        if (editRole) {
          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role.id === updatedRole.id ? updatedRole : role
            )
          );
        } else {
          fetchRoles();
        }

        handleClose();
        setNewRole({ title: "" });
        setEditRole(null);
      })
      .catch((err) => console.error("Error submitting role:", err));
  };

  const handleEdit = (role) => {
    setEditRole(role);
    setNewRole({ title: role.title });
    setShowModal(true);
  };

  const handleDelete = (roleId) => {
    fetch(`http://localhost:5000/api/roles/${roleId}`, { method: "DELETE" })
      .then(() => fetchRoles())
      .catch((err) => console.error("Error deleting role:", err));
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <SideNav />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "30px" }}>
          Manage <strong className="purple">Roles</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {roles.map((role) => (
            <Col md={4} key={role.id}>
              <RoleCard
                id={role.id}
                title={role.title}
                onEdit={() => handleEdit(role)}
                onDelete={() => handleDelete(role.id)}
              />
            </Col>
          ))}
        </Row>
        <Row
          style={{
            justifyContent: "center",
            paddingBottom: "330px",
            paddingTop: "20px",
          }}
        >
          <Col md={4}>
            <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Body style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={handleShow}>
                  Create New Role
                </Button>
              </Card.Body>  
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editRole ? "Edit Role" : "Create New Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="roleTitle">
              <Form.Label>Role title</Form.Label>
              <Form.Control
                type="text"
                title="title"
                value={newRole.title}
                onChange={handleInputChange}
                placeholder="Enter role title"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Roles;
