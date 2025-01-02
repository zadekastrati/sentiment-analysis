import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineDislike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

function ProjectCard({
  imgPath,
  title,
  description,
  author,
  id,
  ghLink,
  demoLink,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <Card
        className="project-card-view"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
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
              onEdit();
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
              onDelete();
            }}
            style={{
              fontSize: "1.5em",
              color: "#fff",
              cursor: "pointer",
            }}
          />
        </div>
        <Card.Img
          variant="top"
          src={`http://localhost:5000/${imgPath}`}
          alt={`${title} image`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <strong>Author:</strong> {author}
          </Card.Text>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="primary"
              href={ghLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <AiOutlineLike style={{ fontSize: "1.5em", color: "#000" }} />
            </Button>
            <Button variant="primary" onClick={(e) => e.stopPropagation()}>
              <AiOutlineDislike style={{ fontSize: "1.5em", color: "#000" }} />
            </Button>
            <Button variant="primary" href={demoLink} target="_blank">
              <AiOutlineComment style={{ fontSize: "1.5em", color: "#000" }} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProjectCard;
