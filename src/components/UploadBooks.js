import React, { useState } from 'react';
import { useTelegramUser } from '../TelegramUserContext';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

const UploadBookComponent = () => {
  const telegramUser = useTelegramUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [webtoons, setWebtoons] = useState(false);
  const [file, setFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
const API=process.env.REACT_APP_API_URL;
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleCoverPhotoChange = (e) => setCoverPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!telegramUser) {
      alert("Please log in with Telegram to upload a book.");
      return;
    }

    const tg = window.Telegram.WebApp;
    tg.showPopup({ message: 'Book upload is in progress...' });
    setUploading(true);
    setUploadMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('genre', genre);
    formData.append('webtoons', webtoons);
    formData.append('file', file);
    formData.append('coverPhoto', coverPhoto);
    formData.append('uploadedBy', telegramUser.id);
    formData.append('author', `${telegramUser.first_name} ${telegramUser.last_name || ''}`);

    try {
      const response = await fetch('${API}/api/upload-book', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadMessage('Book upload successful');
        tg.showPopup({ message: 'Book upload successful' });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setUploadMessage('Book upload unsuccessful');
      tg.showPopup({ message: 'Book upload unsuccessful' });
      console.error('Error uploading book:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <h2 className="text-center mb-4" style={{ color: '#333' }}>Upload a Book</h2>
      <Form onSubmit={handleSubmit} className="p-4 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGenre" className="mb-3">
          <Form.Label>Genre</Form.Label>
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

        <Form.Group controlId="webtoons" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Is this a Webtoon?"
            checked={webtoons}
            onChange={(e) => setWebtoons(e.target.checked)}
          />
        </Form.Group>

        <Form.Group controlId="file" className="mb-3">
          <Form.Label>Book File (PDF)</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="coverPhoto" className="mb-3">
          <Form.Label>Cover Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            required
          />
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          className="w-100"
          style={{
            backgroundColor: '#F8E231',
            color: '#333',
            borderColor: '#333'
          }}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Uploading...
            </>
          ) : (
            'Upload Book'
          )}
        </Button>
      </Form>

      {uploadMessage && (
        <Alert
          variant={uploadMessage.includes('Book upload successful') ? 'success' : 'danger'}
          className="mt-3"
        >
          {uploadMessage}
        </Alert>
      )}
    </Container>
  );
};

export default UploadBookComponent;
