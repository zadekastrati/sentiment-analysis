import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaTrashAlt,
  FaEdit,
  FaEllipsisH,
} from "react-icons/fa";

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

  useEffect(() => {
    fetchPostById();
  }, [id]);

  const fetchPostById = () => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setEditPost(data);
      })
      .catch((err) => console.error("Error fetching post details:", err));
  };

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

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
        setPost(updatedPost);
        handleClose();
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
    <Container
      fluid
      className="post-details-section"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            {post ? (
              <div className="post-details-content">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="display-4">{post.title}</h1>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-custom-components"
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                      }}
                    >
                      <FaEllipsisH size={20} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => setShowModal(true)}>
                        <FaEdit /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleDelete}
                        className="text-danger"
                      >
                        <FaTrashAlt /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <img
                  src={"http://localhost:5000/" + post.imgPath}
                  alt={post.title}
                  className="img-fluid rounded mb-4"
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <p className="lead">{post.description}</p>
                <p className="text-muted">By {post.author}</p>

                <div className="action-buttons d-flex justify-content-end mt-4">
                  <Button variant="outline-success" className="mx-2">
                    <FaThumbsUp /> Like
                  </Button>
                  <Button variant="outline-danger" className="mx-2">
                    <FaThumbsDown /> Dislike
                  </Button>
                  <Button variant="outline-info" className="mx-2">
                    <FaComment /> Comment
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center">Loading post details...</p>
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
