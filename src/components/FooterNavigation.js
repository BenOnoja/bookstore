import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTelegramUser } from '../TelegramUserContext';
import axios from 'axios';

const FooterNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const [hasUploadedBooks, setHasUploadedBooks] = useState(false);
const API=process.env.REACT_APP_API_URL;
  const telegramUser = useTelegramUser();

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (telegramUser) {
        try {
          const response = await axios.get(`${API}/api/get-uploaded-books/${telegramUser.id}`);
          setHasUploadedBooks(response.data.length > 0);
        } catch (error) {
          console.error('Error fetching user books:', error);
        }
      }
    };

    fetchUserBooks();
  }, [telegramUser]);

  const handleMenuClose = () => setShowMenu(false);
  const handleMenuShow = () => setShowMenu(true);

  const handleSpecialClose = () => setShowSpecial(false);
  const handleSpecialShow = () => setShowSpecial(true);

  return (
    <>
      <Navbar 
        fixed="bottom" 
        className="justify-content-around"
        style={{ 
          zIndex: 1000, 
          width: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          backdropFilter: 'blur(5px)' 
        }}
      >
        <Nav>
          <Nav.Link onClick={handleMenuShow} style={{ color: '#F8E231' }}>
            Menu
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/" style={{ color: '#F8E231' }}>
            <i className="bi bi-house" style={{ color: '#F8E231' }}></i>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleSpecialShow} style={{ color: '#F8E231' }}>Special</Nav.Link>
        </Nav>
      </Navbar>

      <Offcanvas 
        show={showMenu} 
        onHide={handleMenuClose} 
        placement="start" 
        style={{ 
          width: '75%',  
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: '#F8E231' }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav.Link as={Link} to="/profile" style={{ color: '#F8E231' }} className="d-flex align-items-center" onClick={handleMenuClose}>
            <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
            Your Profile
          </Nav.Link>
          <Nav.Link style={{color: '#F8E231'}} onClick={handleMenuClose}>Webtoons</Nav.Link>
          <Nav.Link style={{color: '#F8E231'}} onClick={handleMenuClose}>Romance</Nav.Link>
          <Nav.Link style={{color: '#F8E231'}} onClick={handleMenuClose}>Sci-Fi</Nav.Link>
          <Nav.Link style={{color: '#F8E231'}} onClick={handleMenuClose}>Drama</Nav.Link>
          <Nav.Link style={{color: '#F8E231'}} onClick={handleMenuClose}>Thriller</Nav.Link>
          
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offcanvas for the Special Tab */}
      <Offcanvas 
        show={showSpecial} 
        onHide={handleSpecialClose} 
        placement="end" 
        style={{ 
          width: '75%',  
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: '#F8E231' }}>Special</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav.Link as={Link} to="/create-your-story" style={{ color: '#F8E231' }} onClick={handleSpecialClose}>
            Create Your Own Story
          </Nav.Link>
          {/* Conditionally render the "Edit Books" link if the user has uploaded any books */}
          {hasUploadedBooks && (
            <Nav.Link as={Link} to="/my-books/${telegramUser.id}" style={{ color: '#F8E231' }} onClick={handleSpecialClose}>
              Edit Books
            </Nav.Link>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FooterNavigation;
