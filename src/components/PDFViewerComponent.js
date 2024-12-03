import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewerComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedBookUrl, bookTitle, selectedBookId, user, priceBook } = location.state;
const API=process.env.REACT_APP_API_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasPaid, setHasPaid] = useState(false);

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: { downloadPlugin: { enableDownload: false } },
    });

    const handleGoToReviews = () => {
        navigate(`/book/${selectedBookId}`, {
            state: { bookId: selectedBookId },
        });
    };

    const handlePageChange = (e) => {
        const newPage = e.currentPage;
        setCurrentPage(newPage);

<<<<<<< HEAD
        fetch('${API}/api/save-progress', {
=======
        fetch(`${API}/api/save-progress`, {
>>>>>>> 2e385ca (reconstructed the entire app)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telegram_user_id: user.id,
                book_id: selectedBookId,
                current_page: newPage,
            }),
        }).catch((error) => console.error('Error:', error));

        if (newPage >= 3 && !hasPaid) {
            // Trigger handlePayment directly if user has not paid
            handlePayment();
        }
    };

    const handlePayment = () => {
        // Navigate to PaymentPage with required state
        navigate(`/payment`, { state: { bookId: selectedBookId, price: priceBook, telegramuser: user } });
    };

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(
                    `${API}/api/transaction-status?telegram_user_id=${user.id}&book_id=${selectedBookId}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setHasPaid(data.has_paid);
                } else {
                    console.error('Error checking payment status:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        const fetchProgress = async () => {
            try {
                const response = await fetch(`${API}/api/get-progress?telegram_user_id=${user.id}&book_id=${selectedBookId}`);
                const data = await response.json();
                if (data.current_page) {
                    setCurrentPage(data.current_page);
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        checkPaymentStatus();
        fetchProgress();
    }, [user.id, selectedBookId]);

    return (
        <div style={{ position: 'relative' }}>
            <h2 style={{ color: '#F8E231', fontWeight: 'bold', backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 0.8 }}>
                {bookTitle ? `Reading: ${bookTitle}` : 'Reading Book'}
            </h2>

            <button
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#F8E231',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleGoToReviews}
            >
                Reviews
            </button>

            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={selectedBookUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    initialPage={currentPage - 1}
                    onPageChange={handlePageChange}
                />
            </Worker>
        </div>
    );
};

export default PDFViewerComponent;
