import React, { useEffect, useState } from 'react';
import { Container, Card, Carousel, Button, Image, Row } from 'react-bootstrap';
import { useTelegramUser } from '../TelegramUserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const YourProfile = () => {
const API=process.env.REACT_APP_API_URL;
  const telegramUser = useTelegramUser();
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedBooks = async () => {
      try {
        const response = await axios.get(`${API}/api/get-uploaded-books/${telegramUser.id}`);
        setUploadedBooks(response.data);
      } catch (error) {
        console.error('Error fetching uploaded books:', error);
      }
    };

    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(`${API}/api/get-recent-books/${telegramUser.id}`);
        setRecentBooks(response.data);
      } catch (error) {
        console.error('Error fetching recent books:', error);
      }
    };

    if (telegramUser) {
      fetchUploadedBooks();
      fetchRecentBooks();
    }
  }, [telegramUser]);

  const handleBookClick = (book) => {
  navigate(`/read-book/${book.id}`, {
    state: {
      selectedBookUrl: book.file_path,
      bookTitle: book.title,
      selectedBookId: book.id,
      user: telegramUser,
    },
  });
};


  const renderBooks = (books) => (
    <Carousel interval={null} indicators={false}>
      {books.map((book) => (
        <Carousel.Item key={book.id}>
          <Card className="h-100 shadow-sm bg-dark text-light" style={{ transform: 'scale(0.66)' }}>
            <Card.Body className="d-flex flex-column">
              <Card.Title style={{ color: '#F8E231' }}>{book.title}</Card.Title>
              <Card.Text style={{ color: '#F8E231' }}><strong>Price:&#8358;{book.price}</strong></Card.Text>
              <Image
                src={book.cover_photo_path}
                alt={`Cover of ${book.title}`}
                fluid
                onClick={() => handleBookClick(book)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '10px',
                  width: '50%',
                  height: 'auto',
                  alignSelf: 'center',
                }}
              />
              <Button
                onClick={() => handleBookClick(book)}
                className="mt-auto"
                style={{ marginTop: '10px', backgroundColor: '#F8E231', border: 'none', color: '#000' }}
              >
                View Book
              </Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return (
    <Container className="pt-5 mt-5" style={{ minHeight: '100vh' }}>
      <h1 style={{ color: '#F8E231' }}>Your Profile</h1>
      <Card style={{ color: '#F8E231' }} className="bg-dark text-light mb-5">
        <Card.Body>
          <Card.Title style={{ color: '#F8E231' }}>{telegramUser?.first_name} {telegramUser?.last_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ color: '#F8E231' }}>{telegramUser?.username}</Card.Subtitle>
          
          {/* Uploaded Books Section */}
          <h5 className="mt-4" style={{ color: '#F8E231' }}>Uploaded Books</h5>
          {uploadedBooks.length > 0 ? (
            renderBooks(uploadedBooks)
          ) : (
            <div>
<<<<<<< HEAD
              <p>No books published yet. <Link to="/create-your-story">Click here to create a story.</Link></p>
=======
              <p>No books published yet. <Link to="/create-your-story" style ={{color:white}}>Click here to create a story.</Link></p>
>>>>>>> 2e385ca (reconstructed the entire app)
            </div>
          )}

          {/* Recently Opened Books Section */}
          <h5 className="mt-4" style={{ color: '#F8E231' }}>Recently Opened Books</h5>
          {recentBooks.length > 0 ? (
            renderBooks(recentBooks)
          ) : (
            <p>No recently opened books yet.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default YourProfile;
