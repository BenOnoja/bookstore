import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 2e385ca (reconstructed the entire app)
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DisplayBooksComponent = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
<<<<<<< HEAD
const API=process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('${API}/api/get-books');
        setBooks(response.data);
=======
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API}/api/get-books`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
>>>>>>> 2e385ca (reconstructed the entire app)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
<<<<<<< HEAD
  }, []);

  const handleBookClick = (bookId) => {
    // Navigate to the book review page
=======
  }, [API]);

  const handleBookClick = (bookId) => {
>>>>>>> 2e385ca (reconstructed the entire app)
    navigate(`/book/${bookId}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: '#F8E231', opacity: 0.8 }}>
        Available Books
      </h2>
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
<<<<<<< HEAD
            <Card style={{transform: 'scale(0.66)'}} className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text><strong>Price:&#8358; {book.price}</strong></Card.Text>
=======
            <Card style={{ transform: 'scale(0.66)' }} className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Price: &#8358; {book.price}</strong>
                </Card.Text>
>>>>>>> 2e385ca (reconstructed the entire app)
                <Image
                  src={`${book.cover_photo_path}`}
                  alt={`Cover of ${book.title}`}
                  fluid
                  onClick={() => handleBookClick(book.id)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '10px',
                    width: '50%',
                    height: 'auto',
                    alignSelf: 'center',
                  }}
                />
                <Button
                  onClick={() => handleBookClick(book.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#F8E231',
                    border: 'none',
                    color: '#000',
                  }}
                  className="mt-auto"
                >
                  View Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DisplayBooksComponent;