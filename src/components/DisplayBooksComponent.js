import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DisplayBooksComponent = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
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
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [API]);

  const handleBookClick = (bookId) => {
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
            <Card style={{ transform: 'scale(0.65)' }} className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Price: &#8358; {book.price}</strong>
                </Card.Text>
                <Image
                  src={book.cover_photo_path}
                  alt={`Cover of ${book.title}`}
                  fluid
                  onClick={() => handleBookClick(book.id)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '10px',
                    width: '100%',
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