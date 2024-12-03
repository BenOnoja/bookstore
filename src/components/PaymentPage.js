import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookId, price, telegramuser } = location.state;
const API=process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');
    const [paymentReference, setPaymentReference] = useState('');

    const handlePaymentInitialization = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch('${API}/api/initialize-payment', {
=======
            const response = await fetch(`${API}/api/initialize-payment`, {
>>>>>>> 2e385ca (reconstructed the entire app)
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    amount: price, // Convert price to kobo
                    bookId,
                    telegramUserId: telegramuser.id, // Pass Telegram user ID
                }),
            });

            const data = await response.json();

            if (data.status) {
                setPaymentUrl(data.authorization_url);
                setPaymentReference(data.reference);

                // Wait for a brief moment to ensure iframe is loaded, then verify payment
                setTimeout(() => handlePaymentVerification(data.reference), 20000);
            } else {
                console.error('Error initializing payment:', data.message);
                alert('Failed to initialize payment. Please try again.');
            }
        } catch (error) {
            console.error('Error initializing payment:', error);
            alert('Failed to initialize payment. Please try again.');
        }
    };

    const handlePaymentVerification = async (reference) => {
        try {
            const response = await fetch(`${API}/api/payment-status/${reference}`);
            const data = await response.json();

            if (data.status) {
                window.Telegram.WebApp.showAlert('Payment verified successfully!');
<<<<<<< HEAD
                navigate(`/book/${bookId}`);
=======
                navigate(`/read-book/${bookId}`);
>>>>>>> 2e385ca (reconstructed the entire app)
            } else {
                window.Telegram.WebApp.showAlert('Payment verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#F8E231', fontWeight: 'bold' }}>Complete Payment</h2>
            <p>Book Price: <strong>₦{price}</strong></p>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '10px',
                    width: '80%',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                }}
            />
            <br />

            <button
                onClick={handlePaymentInitialization}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#F8E231',
                    color: 'black',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Pay Now
            </button>

            {paymentUrl && (
                <div style={{ marginTop: '20px' }}>
                    <iframe
                        src={paymentUrl}
                        title="Payment"
                        style={{
                            width: '100%',
                            height: '500px',
                            border: 'none',
                            backgroundColor:'white'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
