// EditBookComponent.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import {useTelegramUser} from '../TelegramUserContext.js'
const EditBookComponent = () => {
const API=process.env.REACT_APP_API_URL;
const telegramUser=useTelegramUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [webtoons, setWebtoons] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API}/api/get-book/${id}`);
        const bookData = response.data;
        setBook(bookData);
        setTitle(bookData.title);
        setDescription(bookData.description);
        setPrice(bookData.price);
        setGenre(bookData.genre);
        setWebtoons(bookData.webtoons);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('genre', genre);
    formData.append('webtoons', webtoons);

    if (coverPhoto) formData.append('coverPhoto', coverPhoto);
    if (file) formData.append('file', file);

    try {
      const response = await axios.put(`${API}/api/edit-book/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        navigate('/my-books/${telegramUser.id}');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Edit Book</h2>
          <Form onSubmit={handleSubmit} className="p-4 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGenre" className="mb-3">
              <Form.Label>Genre:</Form.Label>
              <Form.Control
                as="select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Select Genre</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formWebtoons" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is this a Webtoon?"
                checked={webtoons}
                onChange={(e) => setWebtoons(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="formCoverPhoto" className="mb-3">
              <Form.Label>Update Cover Photo:</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleCoverPhotoChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Update Book File (PDF or DOCX):</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button type="submit" className="w-100" style={{ backgroundColor: '#F8E231', border: 'none', color: '#000' }}>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditBookComponent;
