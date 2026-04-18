import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeatGrid from '../components/SeatGrid';
import { useBooking } from '../context/BookingContext';
import { movies } from '../data/movies';
import '../styles/SeatBooking.css';

const SeatBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMovie, selectedSeats, selectedShowtime, selectedTheatre, toggleSeat } = useBooking();
  
  const movie = selectedMovie || movies.find(m => m.id === id);

  if (!movie) {
    navigate('/movies');
    return null;
  }

  const handleSeatSelect = (seatId, bookedSeats) => {
    toggleSeat(seatId, bookedSeats);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate('/checkout');
  };

  const totalPrice = selectedSeats.length * movie.price;

  return (
    <div className="seat-booking-page">
      <div className="container">
        <motion.h1
          className="page-title gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Select Your Seats
        </motion.h1>

        <motion.div
          className="booking-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>{movie.title}</h2>
          <div className="booking-meta">
            <span>{selectedTheatre?.name || 'Select Theatre'}</span>
            <span>•</span>
            <span>{selectedShowtime || 'Select Showtime'}</span>
          </div>
        </motion.div>

        <div className="booking-layout">
          {/* Seat Grid */}
          <motion.div
            className="seat-grid-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SeatGrid
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            className="booking-summary"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="summary-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="summary-poster"
              />
              
              <h3 className="summary-title">{movie.title}</h3>
              
              <div className="summary-details">
                <div className="detail-row">
                  <span className="detail-label">Showtime:</span>
                  <span className="detail-value">{selectedShowtime || '-'}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Seats:</span>
                  <span className="detail-value">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Tickets:</span>
                  <span className="detail-value">{selectedSeats.length}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Price per ticket:</span>
                  <span className="detail-value">${movie.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">${totalPrice.toFixed(2)}</span>
              </div>

              <motion.button
                className="neon-button continue-button"
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
                whileHover={{ scale: selectedSeats.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selectedSeats.length > 0 ? 0.95 : 1 }}
              >
                Continue to Checkout
              </motion.button>

              {selectedSeats.length >= 8 && (
                <p className="max-seats-warning">
                  Maximum 8 seats allowed per booking
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
