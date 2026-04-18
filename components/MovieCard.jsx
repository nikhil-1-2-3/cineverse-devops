import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useTilt } from '../hooks/useTilt';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, index = 0, variant = 'normal' }) => {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(20);

  if (variant === 'flip') {
    return <FlipMovieCard movie={movie} index={index} />;
  }

  return (
    <motion.div
      className="movie-card"
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster-container">
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
          />
          <div className="poster-overlay" />
          
          <motion.div
            className="rating-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <FiStar className="star-icon" />
            <span className="rating-value">{movie.rating}</span>
          </motion.div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-duration">{movie.duration}</span>
          </div>
          <div className="movie-genres">
            {movie.genre.slice(0, 2).map((g, i) => (
              <span key={i} className="genre-tag">{g}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FlipMovieCard = ({ movie, index }) => {
  return (
    <motion.div
      className="movie-card-flip"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flip-inner">
        <div className="flip-front">
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
          />
          <div className="poster-overlay" />
          <motion.div
            className="rating-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <FiStar className="star-icon" />
            <span className="rating-value">{movie.rating}</span>
          </motion.div>
        </div>

        <div className="flip-back">
          <div className="flip-back-content">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="movie-year">{movie.year}</span>
              <span className="movie-duration">{movie.duration}</span>
            </div>
            <p className="movie-description">{movie.description.substring(0, 100)}...</p>
            <div className="movie-genres">
              {movie.genre.map((g, i) => (
                <span key={i} className="genre-tag">{g}</span>
              ))}
            </div>
            <Link to={`/movie/${movie.id}`} className="neon-button book-now-btn">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
