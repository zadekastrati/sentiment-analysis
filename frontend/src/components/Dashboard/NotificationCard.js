import React from "react";
import { Card, Button } from "react-bootstrap";

function NotificationCard({ id, title, message, type, read, onEdit, onDelete }) {
  return (
    <Card
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{message}</Card.Text>
        <Card.Text>
          <strong>Type:</strong> {type}
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> {read ? "Read" : "Unread"}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="warning" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NotificationCard;
