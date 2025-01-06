import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import Particle from "../Particle";
import SideNav from "./SideNav";
import ContactUsCard from "./ContactUsCard"; // Create a component for displaying individual messages

function ContactUs() {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({ name: "", email: "", message: "" });
  const [editMessage, setEditMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchMessages = () => {
    fetch("http://localhost:5000/api/contact-us")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Error fetching messages:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editMessage
      ? `http://localhost:5000/api/contact-us/${editMessage.id}`
      : "http://localhost:5000/api/contact-us";
    const method = editMessage ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((updatedMessage) => {
        if (editMessage) {
          setMessages((prevMessages) =>
            prevMessages.map((message) =>
              message.id === updatedMessage.id ? updatedMessage : message
            )
          );
        } else {
          fetchMessages();
        }

        handleClose();
        setNewMessage({ name: "", email: "", message: "" });
        setEditMessage(null);
      })
      .catch((err) => console.error("Error submitting message:", err));
  };

  const handleEdit = (message) => {
    setEditMessage(message);
    setNewMessage({ name: message.name, email: message.email, message: message.message });
    setShowModal(true);
  };

  const handleDelete = (messageId) => {
    fetch(`http://localhost:5000/api/contact-us/${messageId}`, { method: "DELETE" })
      .then(() => fetchMessages())
      .catch((err) => console.error("Error deleting message:", err));
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <SideNav />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "30px" }}>
          Manage <strong className="purple">Messages</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {messages.map((message) => (
            <Col md={4} key={message.id}>
              <ContactUsCard
                id={message.id}
                name={message.name}
                email={message.email}
                message={message.message}
                onEdit={() => handleEdit(message)}
                onDelete={() => handleDelete(message.id)}
              />
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "330px", paddingTop: "20px" }}>
          <Col md={4}>
            <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Body style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={handleShow}>
                  Create New Message
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMessage ? "Edit Message" : "Create New Message"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="messageName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newMessage.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group controlId="messageEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newMessage.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                style={{ backgroundColor: "white" }} // Set email background color to white
              />
            </Form.Group>

            <Form.Group controlId="messageContent">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={newMessage.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
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

export default ContactUs;
