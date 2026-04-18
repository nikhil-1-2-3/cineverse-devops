import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { searchAndFormatMovies } from '../services/movieApi';
import '../styles/Movies.css';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Search movies when searchTerm changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchTerm.trim()) {
        setLoading(true);
        setHasSearched(true);
        const results = await searchAndFormatMovies(searchTerm);
        setMovies(results);
        setLoading(false);
      } else {
        setMovies([]);
        setHasSearched(false);
      }
    }, 500); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  return (
    <div className="movies-page">
      <div className="container">
        <motion.h1
          className="page-title gradient-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Search Movies
        </motion.h1>

        {/* Search Box */}
        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-box-professional">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search movies by title (e.g., Avengers, Batman, Inception)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-professional"
            />
            {loading && <div className="search-spinner" />}
          </div>
          <p className="search-hint">Powered by OMDb API • Real-time search with IMDB ratings</p>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              className="movies-grid"
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonLoader type="card" count={8} />
            </motion.div>
          ) : movies.length > 0 ? (
            <motion.div
              className="movies-grid"
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </motion.div>
          ) : hasSearched ? (
            <motion.div
              className="no-results"
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="no-results-icon">🎬</div>
              <h3>No movies found</h3>
              <p>Try searching for a different movie title</p>
            </motion.div>
          ) : (
            <motion.div
              className="initial-state"
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="initial-icon">🍿</div>
              <h2>Discover Movies</h2>
              <p>Search for your favorite movies with real-time IMDB data</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Movies;
