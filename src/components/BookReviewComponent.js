import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTelegramUser } from '../TelegramUserContext';

const BookReviewComponent = () => {
const API=process.env.REACT_APP_API_URL;
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();
  const telegramUser = useTelegramUser();

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${API}/api/get-book/${bookId}`);
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Fetch book reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API}/api/get-reviews/${bookId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setReviewLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  const handleStartReading = () => {
    navigate(`/read-book/${bookId}`, {
      state: {
        selectedBookUrl: bookDetails.file_path,
        bookTitle: bookDetails.title,
        selectedBookId: bookId,
        user: telegramUser,
        priceBook: bookDetails.price
      },
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      alert('Please provide a rating and a review.');
      return;
    }

    try {
      const response = await fetch('${API}/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book_id: bookId,
          user_id: telegramUser.id,
          rating,
          review_text: reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      alert('Review submitted successfully!');
      setReviewText('');
      setRating(0);

      // Refetch reviews to update the list
      const updatedReviews = await fetch(`${API}/api/get-reviews/${bookId}`);
      setReviews(await updatedReviews.json());
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            color: i <= rating ? '#F8E231' : '#CCCCCC',
            fontSize: '24px',
          }}
          onClick={() => setRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Check if the current user has already reviewed the book
  const hasReviewed = reviews.some(review => review.username === telegramUser.username);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply smooth scrolling style to body
  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    document.body.style.scrollBehavior = 'smooth';
  }, []);

  if (loading) {
    return <div style={{color:'#F8E231'}}>Loading book details...</div>;
  }

  if (!bookDetails) {
    return <div>No book details found.</div>;
  }

  return (
    <div className="book-review-container">
      {/* Book Card Section */}
      <div className="card" style={{ width: '250px', borderColor: '#F8E231', borderWidth: '6px', margin: '20px auto' }}>
        <img
          src={bookDetails.cover_photo_path}
          alt={`Cover of ${bookDetails.title}`}
          className="card-img-top"
          style={{ width: '100%', height: '300px', objectFit: 'cover', padding: '10px' }}
        />
        <div className="card-body text-center" style={{ padding: '15px' }}>
          <h5 className="card-title" style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {bookDetails.title}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted" style={{ marginBottom: '10px' }}>
            by {bookDetails.author}
          </h6>
          <p className="card-text" style={{ marginBottom: '10px' }}>
            Price:&#8358;{bookDetails.price}
          </p>
          <button
            className="btn"
            style={{ backgroundColor: '#F8E231', color: '#333', padding: '10px 20px' }}
            onClick={handleStartReading}
          >
            Start Reading
          </button>
        </div>
<<<<<<< HEAD
=======
        <p style={{color:'#F8E231'}}>{bookDetails.description}</p>
>>>>>>> 2e385ca (reconstructed the entire app)
      </div>

      {/* Reviews Section */}
      <div className="reviews-container" style={{ marginTop: '20px', color: '#F8E231' }}>
        <h5 style={{ color: '#F8E231' }}>Reviews:</h5>
        {reviewLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {reviews.map((review) => (
              <li key={review.id} style={{ marginBottom: '10px', backgroundColor: 'black', opacity: 0.8, padding: '10px' }}>
                <strong>{review.username}:</strong> {review.review_text} (Rating: {review.rating}/5)
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Submit Review Section */}
      {!hasReviewed && (
        <div className="submit-review-container" style={{ marginTop: '20px' }}>
          <h5 style={{ color: '#F8E231' }}>Write a Review:</h5>
          <form onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label style={{ color: '#F8E231' }}>Rating:</label>
              <div>{renderStars()}</div>
            </div>
            <div className="form-group">
              <label style={{ color: '#F8E231' }}>Your Review:</label>
              <textarea
                className="form-control"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
                placeholder="Write your thoughts about the book"
                style={{ resize: 'none' }}
              />
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: '#F8E231', color: '#333', marginTop: '10px' }}>
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#F8E231',
          color: '#333',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 15px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default BookReviewComponent;