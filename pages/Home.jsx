import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import '../styles/Home.css';

const Home = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const featuredMovie = movies.find(m => m.featured) || movies[0];
  const nowShowing = movies.slice(0, 6);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        style={{ opacity }}
      >
        <div className="hero-background">
          <img
            src={featuredMovie.backdrop}
            alt={featuredMovie.title}
            className="hero-backdrop-image"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content container">
          <motion.div
            className="hero-poster"
            initial={{ rotateY: -30, opacity: 0, x: -100 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <img
              src={featuredMovie.poster}
              alt={featuredMovie.title}
              className="hero-poster-image"
            />
          </motion.div>

          <div className="hero-text">
            <motion.h1
              className="hero-title gradient-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {featuredMovie.title}
            </motion.h1>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="hero-rating">⭐ {featuredMovie.rating}</span>
              <span className="hero-year">{featuredMovie.year}</span>
              <span className="hero-duration">{featuredMovie.duration}</span>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {featuredMovie.description}
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to={`/movie/${featuredMovie.id}`} className="neon-button">
                Book Now
              </Link>
              <button className="secondary-button">
                Watch Trailer
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ Scroll to explore
        </motion.div>
      </motion.section>

      {/* Now Showing Section */}
      <section className="now-showing-section container">
        <motion.h2
          className="section-title gradient-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Now Showing
        </motion.h2>

        <div className="slider-container">
          <button className="scroll-button scroll-left" onClick={scrollLeft}>
            <FiChevronLeft />
          </button>

          <div className="movie-slider" ref={scrollRef}>
            {nowShowing.map((movie, index) => (
              <div key={movie.id} className="slider-item">
                <MovieCard movie={movie} index={index} />
              </div>
            ))}
          </div>

          <button className="scroll-button scroll-right" onClick={scrollRight}>
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="top-rated-section container">
        <motion.h2
          className="section-title gradient-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Top Rated
        </motion.h2>

        <div className="movie-grid">
          {topRated.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} variant="flip" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
