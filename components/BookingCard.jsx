import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiX } from 'react-icons/fi';
import '../styles/BookingCard.css';

const BookingCard = ({ booking, onCancel, index = 0 }) => {
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      onCancel(booking.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="booking-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <div className="booking-card-content">
        <div className="booking-poster-section">
          <img
            src={booking.movie.poster}
            alt={booking.movie.title}
            className="booking-poster"
          />
          <div className="booking-status-badge">{booking.status}</div>
        </div>

        <div className="booking-details">
          <h3 className="booking-movie-title">{booking.movie.title}</h3>
          
          <div className="booking-info-grid">
            <div className="booking-info-item">
              <FiCalendar className="info-icon" />
              <span>{formatDate(booking.bookingDate)}</span>
            </div>
            
            <div className="booking-info-item">
              <FiClock className="info-icon" />
              <span>{booking.showtime}</span>
            </div>
            
            <div className="booking-info-item">
              <FiMapPin className="info-icon" />
              <span>{booking.theatre.name}</span>
            </div>
          </div>

          <div className="booking-seats">
            <span className="seats-label">Seats:</span>
            <div className="seats-list">
              {booking.seats.map((seat, i) => (
                <span key={i} className="seat-badge">{seat}</span>
              ))}
            </div>
          </div>

          <div className="booking-total">
            <span className="total-label">Total Amount:</span>
            <span className="total-amount">${booking.total.toFixed(2)}</span>
          </div>

          {booking.status === 'confirmed' && (
            <motion.button
              className="cancel-button"
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX /> Cancel Booking
            </motion.button>
          )}
        </div>

        {/* Barcode decoration */}
        <div className="booking-barcode">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="barcode-line"
              style={{ width: Math.random() > 0.5 ? '2px' : '1px' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
