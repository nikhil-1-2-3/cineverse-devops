import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedSeats, selectedShowtime, selectedTheatre, addBooking } = useBooking();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!selectedMovie) {
    navigate('/movies');
    return null;
  }

  const totalPrice = selectedSeats.length * selectedMovie.price;
  const serviceFee = 2.99;
  const finalTotal = totalPrice + serviceFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const booking = addBooking();
      setBookingId(booking.id);
      setProcessing(false);
      setSuccess(true);

      // Auto redirect after 3 seconds
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.h1
          className="page-title gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Checkout
        </motion.h1>

        <div className="checkout-layout">
          {/* Booking Summary */}
          <motion.div
            className="checkout-summary"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="summary-card">
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="summary-poster"
              />
              
              <h2 className="movie-title">{selectedMovie.title}</h2>
              
              <div className="summary-info">
                <div className="info-row">
                  <span>Theatre:</span>
                  <span>{selectedTheatre?.name}</span>
                </div>
                <div className="info-row">
                  <span>Showtime:</span>
                  <span>{selectedShowtime}</span>
                </div>
                <div className="info-row">
                  <span>Seats:</span>
                  <span>{selectedSeats.join(', ')}</span>
                </div>
                <div className="info-row">
                  <span>Tickets:</span>
                  <span>{selectedSeats.length}</span>
                </div>
              </div>

              <div className="price-breakdown">
                <h3>Price Breakdown</h3>
                <div className="price-row">
                  <span>Tickets ({selectedSeats.length} × ${selectedMovie.price.toFixed(2)})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span className="total-amount">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            className="payment-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="payment-form">
              <h2>Payment Details</h2>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength="19"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    required
                    maxLength="5"
                  />
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength="3"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="neon-button pay-button"
                disabled={processing}
                whileHover={{ scale: processing ? 1 : 1.05 }}
                whileTap={{ scale: processing ? 1 : 0.95 }}
              >
                {processing ? (
                  <span className="spinner-small" />
                ) : (
                  `Pay $${finalTotal.toFixed(2)}`
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-popup"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="confetti-container">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      backgroundColor: ['#e50914', '#00d4ff', '#b829dd', '#00ff88', '#ffd700'][
                        Math.floor(Math.random() * 5)
                      ]
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                ✓
              </motion.div>

              <h2>Booking Confirmed!</h2>
              <p>Your booking has been successfully confirmed</p>
              <div className="booking-id">Booking ID: {bookingId}</div>
              <p className="redirect-text">Redirecting to My Bookings...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
