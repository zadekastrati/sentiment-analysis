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
import ProjectCard from "../Projects/ProjectCards";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    author: "",
    imgPath: "",
  });
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const fetchPosts = () => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    formData.append("author", newPost.author);
    formData.append("imgPath", newPost.imgPath);

    const url = editPost
      ? `http://localhost:5000/api/posts/${editPost.id}`
      : "http://localhost:5000/api/posts";
    const method = editPost ? "PUT" : "POST";

    fetch(url, {
      method: method,
      body: formData,
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        if (editPost) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          );
        } else {
          fetchPosts();
        }

        handleClose();
        setNewPost({ title: "", description: "", author: "", imgPath: "" });
        setEditPost(null);
      })
      .catch((err) => console.error("Error submitting post:", err));
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setNewPost({
      title: post.title,
      description: post.description,
      author: post.author,
      imgPath: post.imgPath,
    });
    setShowModal(true);
  };

  const handleDelete = (postId) => {
    fetch(`http://localhost:5000/api/posts/${postId}`, { method: "DELETE" })
      .then(() => fetchPosts())
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <SideNav />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "30px" }}>
          Manage <strong className="purple">Posts</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {posts.map((post) => (
            <Col md={4} key={post.id}>
              <ProjectCard
                id={post.id}
                imgPath={post.imgPath}
                title={post.title}
                description={post.description}
                author={post.author}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post.id)}
              />
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4}>
          <Card style={{ backgroundColor: "transparent", border: "none" }}>
              <Card.Body style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={handleShow}>
                  Create New Post
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editPost ? "Edit Post" : "Create New Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPost.title}
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
                value={newPost.description}
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
                value={newPost.author}
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Posts;
