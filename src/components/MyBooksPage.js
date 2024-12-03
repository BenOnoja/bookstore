import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
const API=process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API}/api/get-books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleEditClick = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteClick = async (bookId) => {
    // Use Telegram Web App's showConfirm for delete confirmation
    window.Telegram.WebApp.showConfirm("Are you sure you want to delete this book?", async (confirmed) => {
      if (confirmed) {
        try {
          await axios.delete(`${API}/api/delete-book/${bookId}`);
          setBooks(books.filter((book) => book.id !== bookId));
          
          // Show success alert
          window.Telegram.WebApp.showAlert("Book deleted successfully.");
        } catch (error) {
          console.error("Error deleting book:", error);
          window.Telegram.WebApp.showAlert("Failed to delete the book. Please try again.");
        }
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', padding: '16px' }}>
      {books.map((book) => (
        <Card key={book.id} style={{ width: '200px', position: 'relative', marginBottom: '16px', transform:'scale(0.70)'}}>
          {book.cover_photo_path && (
            <Card.Img variant="top" src={book.cover_photo_path} alt={book.title} />
          )}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Genre:</strong> {book.genre}<br />
              <strong>Price:</strong>&#8358; {book.price}<br />
              <strong>Description:</strong> {book.description}
            </Card.Text>
            <Button 
              variant="warning" 
              onClick={() => handleEditClick(book.id)}
              style={{ marginRight: '8px' }}
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleDeleteClick(book.id)}
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
            >
              <i className="bi bi-trash" style={{ fontSize: '20px' }}></i>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyBooksPage;
