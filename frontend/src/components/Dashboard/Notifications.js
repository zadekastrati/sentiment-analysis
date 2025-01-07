import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import Particle from "../Particle";
import SideNav from "./SideNav";
import NotificationCard from "./NotificationCard";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    userId: "",
    type: "",
    read: false,
  });
  const [editNotification, setEditNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setNewNotification({
      title: "",
      message: "",
      userId: "",
      type: "",
      read: false,
    });
    setEditNotification(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notifications");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editNotification
      ? `http://localhost:5000/api/notifications/${editNotification.id}`
      : "http://localhost:5000/api/notifications";
    const method = editNotification ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
      });

      if (!response.ok) throw new Error("Failed to submit notification");

      const updatedNotification = await response.json();
      if (editNotification) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === updatedNotification.id
              ? updatedNotification
              : notification
          )
        );
      } else {
        setNotifications((prev) => [...prev, updatedNotification]);
      }

      handleClose();
    } catch (err) {
      console.error("Error submitting notification:", err);
    }
  };

  const handleEdit = (notification) => {
    setEditNotification(notification);
    setNewNotification({
      title: notification.title,
      message: notification.message,
      userId: notification.userId,
      type: notification.type,
      read: notification.read,
    });
    setShowModal(true);
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${notificationId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete notification");

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <SideNav />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "30px" }}>
          Manage <strong className="purple">Notifications</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {notifications.map((notification) => (
            <Col md={4} key={notification.id}>
              <NotificationCard
                id={notification.id}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                read={notification.read}
                onEdit={() => handleEdit(notification)}
                onDelete={() => handleDelete(notification.id)}
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
                  Create New Notification
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editNotification ? "Edit Notification" : "Create New Notification"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="notificationTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newNotification.title}
                onChange={handleInputChange}
                placeholder="Enter notification title"
                required
              />
            </Form.Group>
            <Form.Group controlId="notificationMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={newNotification.message}
                onChange={handleInputChange}
                placeholder="Enter notification message"
                required
              />
            </Form.Group>
            <Form.Group controlId="notificationUserId" className="mt-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                name="userId"
                value={newNotification.userId}
                onChange={handleInputChange}
                placeholder="Enter user ID"
                required
              />
            </Form.Group>
            <Form.Group controlId="notificationType" className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={newNotification.type}
                onChange={handleInputChange}
                placeholder="Enter notification type"
                required
              />
            </Form.Group>
            <Form.Group controlId="notificationRead" className="mt-3">
              <Form.Check
                type="checkbox"
                name="read"
                label="Read"
                checked={newNotification.read}
                onChange={(e) =>
                  setNewNotification((prev) => ({
                    ...prev,
                    read: e.target.checked,
                  }))
                }
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

export default Notifications;
