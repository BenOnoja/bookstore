import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ScrollPrompt from './components/ScrollPrompt';
import FooterNavigation from './components/FooterNavigation';
import YourProfile from './components/YourProfile';
import UploadBookComponent from './components/UploadBooks';
import DisplayBooksComponent from './components/DisplayBooksComponent'; 
import BookReviewComponent from './components/BookReviewComponent';
import PDFViewerComponent from './components/PDFViewerComponent';
import EditBookComponent from './components/EditBookComponent';
import MyBooksPage from './components/MyBooksPage';
import PaymentPage from './components/PaymentPage';

import { TelegramUserProvider } from './TelegramUserContext'; // Import the provider

const App = () => {
  return (
    <TelegramUserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </TelegramUserProvider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  
  // Define routes where FooterNavigation should not be displayed
  const noFooterRoutes = ['/book/:bookId'];

  // Check if the current location matches any route where FooterNavigation should be hidden
  const shouldHideFooter = noFooterRoutes.some((route) => location.pathname.startsWith(route.replace(':bookId', '')));

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollPrompt />
              <FooterNavigation />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <TelegramBackButton />
              <YourProfile />
              <FooterNavigation />
            </>
          }
        />
        <Route
          path="/create-your-story"
          element={
            <>
              <TelegramBackButton />
              <UploadBookComponent />
              <FooterNavigation />
            </>
          }
        />
        <Route
          path="/books"
          element={
            <>
              <TelegramBackButton />
              <DisplayBooksComponent />
              <FooterNavigation />
            </>
          }
        />
        <Route
          path="/book/:bookId"
          element={
            <>
              <TelegramBackButton />
              <BookReviewComponent />
            </>
          }
        />
        <Route
          path="/read-book/:bookId"
          element={
            <>
              <TelegramBackButton />
              <PDFViewerComponent />
              <FooterNavigation />
            </>
          }
        />
        <Route
          path="/my-books/:userId"
          element={
            <>
              <TelegramBackButton />
              <MyBooksPage/>
            </>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <>
              <TelegramBackButton />
              <EditBookComponent/>
              <FooterNavigation/>
            </>
          }
        />      

        <Route
          path="/payment"
          element={<><TelegramBackButton/><PaymentPage /></>}
        />
 
      </Routes>

      {/* Conditionally render FooterNavigation */}
      {!shouldHideFooter && <FooterNavigation />}
    </>
  );
};

const TelegramBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    
    tg.BackButton.onClick(() => {
      // Check if there is a previous route in location.state
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate(-1); // Navigate back in history if no specific previous route is available
      }
    });

    return () => {
      tg.BackButton.hide();
      tg.BackButton.offClick();
    };
  }, [navigate, location.state]);

  return null;
};

export default App;
