import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState({
    title: "",
    description: "",
    author: "",
    imgPath: "",
  });

  // Wrap the function in useCallback to prevent unnecessary re-renders
  const fetchPostById = useCallback(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setEditPost(data); // Prepare the edit state
      })
      .catch((err) => console.error("Error fetching post details:", err));
  }, [id]);

  useEffect(() => {
    fetchPostById();
  }, [fetchPostById]); // Now it depends on the stable callback

  // Handle closing the modal
  const handleClose = () => setShowModal(false);

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle the submission of the edit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", editPost.title);
    formData.append("description", editPost.description);
    formData.append("author", editPost.author);
    if (editPost.imgPath instanceof File) {
      formData.append("imgPath", editPost.imgPath);
    }

    fetch(`http://localhost:5000/api/posts/${editPost.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPost(updatedPost); // Update the current post details
        handleClose(); // Close the modal
      })
      .catch((err) => console.error("Error updating post:", err));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" })
      .then(() => {
        navigate("/posts");
      })
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Post <strong className="purple">Details</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6}>
            {post ? (
              <ProjectCard
                id={post.id}
                imgPath={post.imgPath}
                title={post.title}
                description={post.description}
                author={post.author}
                ghLink="#"
                demoLink="#"
                onEdit={() => setShowModal(true)}
                onDelete={handleDelete}
              />
            ) : (
              <p style={{ textAlign: "center", fontSize: "1.2em" }}>
                Loading post details...
              </p>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editPost.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                required
              />
            </Form.Group>
            <Form.Group controlId="postDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editPost.description}
                onChange={handleInputChange}
                placeholder="Enter post description"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group controlId="postAuthor" className="mt-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={editPost.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                required
              />
            </Form.Group>
            <Form.Group controlId="postImage" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="imgPath"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default PostDetails;
