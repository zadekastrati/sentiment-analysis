import React from "react";
import { Card } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function ContactUsCard({ id, name, email, message, onEdit, onDelete }) {
  return (
    <div>
      <Card className="project-card-view" style={{ cursor: "pointer" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
            top: "10px",
          }}
        >
          <AiOutlineEdit
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            style={{
              fontSize: "1.5em",
              color: "#fff",
              cursor: "pointer",
            }}
          />
          <AiOutlineDelete
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            style={{
              fontSize: "1.5em",
              color: "#fff",
              cursor: "pointer",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>{message}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ContactUsCard;
