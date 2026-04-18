import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiClock, FiX, FiArrowLeft } from 'react-icons/fi';
import { movies, theatres } from '../data/movies';
import { useBooking } from '../context/BookingContext';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectMovie, selectShowtime, selectTheatre, selectedShowtime, selectedTheatre } = useBooking();
  const [showTrailer, setShowTrailer] = useState(false);
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="not-found container">
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/movies')} className="neon-button">
          Back to Movies
        </button>
      </div>
    );
  }

  const handleSelectShowtime = (showtime) => {
    selectShowtime(showtime);
  };

  const handleSelectTheatre = (e) => {
    const theatre = theatres.find(t => t.id === e.target.value);
    selectTheatre(theatre);
  };

  const handleBookSeats = () => {
    if (!selectedShowtime) {
      alert('Please select a showtime');
      return;
    }
    if (!selectedTheatre) {
      alert('Please select a theatre');
      return;
    }
    selectMovie(movie);
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-details-page">
      {/* Back Button */}
      <motion.button
        className="back-button"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/movies')}
      >
        <FiArrowLeft /> Back
      </motion.button>

      <div className="container">
        <div className="details-content">
          {/* Poster */}
          <motion.div
            className="details-poster"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={movie.poster} alt={movie.title} />
          </motion.div>

          {/* Movie Info */}
          <motion.div
            className="details-info"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="details-title gradient-text">{movie.title}</h1>

            <div className="details-badges">
              <div className="badge rating-badge">
                <FiStar className="badge-icon" />
                <span>{movie.rating}/10</span>
              </div>
              <div className="badge duration-badge">
                <FiClock className="badge-icon" />
                <span>{movie.duration}</span>
              </div>
              <div className="badge year-badge">
                <span>{movie.year}</span>
              </div>
            </div>

            <div className="details-genres">
              {movie.genre.map((g, i) => (
                <span key={i} className="genre-pill">{g}</span>
              ))}
            </div>

            <p className="details-description">{movie.description}</p>

            {/* Theatre Selection */}
            <div className="theatre-selection">
              <label className="selection-label">Select Theatre:</label>
              <select
                className="theatre-dropdown"
                onChange={handleSelectTheatre}
                value={selectedTheatre?.id || ''}
              >
                <option value="">Choose a theatre</option>
                {theatres.map(theatre => (
                  <option key={theatre.id} value={theatre.id}>
                    {theatre.name} - {theatre.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Showtime Selection */}
            <div className="showtime-selection">
              <label className="selection-label">Select Showtime:</label>
              <div className="showtime-buttons">
                {movie.showtimes.map((time, index) => (
                  <motion.button
                    key={index}
                    className={`showtime-button ${selectedShowtime === time ? 'active' : ''}`}
                    onClick={() => handleSelectShowtime(time)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="details-actions">
              <motion.button
                className="neon-button select-seats-button"
                onClick={handleBookSeats}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Select Seats
              </motion.button>

              <motion.button
                className="trailer-button"
                onClick={() => setShowTrailer(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Trailer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            className="trailer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              className="trailer-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setShowTrailer(false)}
              >
                <FiX />
              </button>
              <div className="trailer-placeholder">
                <h2>Trailer: {movie.title}</h2>
                <p>Video player would be embedded here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDetails;
