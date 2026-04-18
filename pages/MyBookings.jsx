import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import { useBooking } from '../context/BookingContext';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const { bookings, cancelBooking } = useBooking();

  const handleCancel = (bookingId) => {
    cancelBooking(bookingId);
  };

  return (
    <div className="my-bookings-page">
      <div className="container">
        <motion.h1
          className="page-title gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Bookings
        </motion.h1>

        <AnimatePresence mode="wait">
          {bookings.length > 0 ? (
            <motion.div
              className="bookings-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {bookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancel}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="empty-icon">🎬</div>
              <h2>No Bookings Yet</h2>
              <p>You haven't made any bookings. Start exploring movies and book your next cinematic experience!</p>
              <Link to="/movies" className="neon-button">
                Browse Movies
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyBookings;
