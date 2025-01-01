import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { Container, Row, Col, Button } from "react-bootstrap";

function PostDetails() {
  const { id } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`) // Use the ID to fetch the specific post
      .then((res) => res.json())
      .then((data) => setPost(data)) // Set the single post data
      .catch((err) => console.error("Error fetching post details:", err));
  }, [id]);

  if (!post) return <div>Loading...</div>; // Display loading until the post is fetched

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Post <strong className="purple">Details</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6}>
            <ProjectCard
              id={post.id}
              imgPath={post.imgPath}
              title={post.title}
              description={post.description}
              author={post.author}
              ghLink="#" // Placeholder for GitHub link
              demoLink="#" // Placeholder for demo link
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PostDetails;
