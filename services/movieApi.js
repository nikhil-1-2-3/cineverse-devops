// OMDb API Service
const API_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy'; // Demo key for testing

/**
 * Search movies by title
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @returns {Promise<Array>} - Array of movie results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return [];
    }
    
    return data.Search || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

/**
 * Get detailed movie information by IMDB ID
 * @param {string} imdbID - IMDB ID of the movie
 * @returns {Promise<Object>} - Movie details
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

/**
 * Get movie details by title and year
 * @param {string} title - Movie title
 * @param {string} year - Release year (optional)
 * @returns {Promise<Object>} - Movie details
 */
export const getMovieByTitle = async (title, year = '') => {
  try {
    const yearParam = year ? `&y=${year}` : '';
    const response = await fetch(
      `${API_BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}${yearParam}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie by title:', error);
    return null;
  }
};

/**
 * Convert OMDb movie object to our app format
 * @param {Object} movie - OMDb movie object
 * @returns {Object} - Formatted movie object
 */
export const formatMovieData = (movie) => {
  return {
    id: movie.imdbID || `movie_${Date.now()}`,
    imdbID: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
    backdrop: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1920x1080?text=No+Image',
    rating: movie.imdbRating ? parseFloat(movie.imdbRating) : 0,
    genre: movie.Genre ? movie.Genre.split(', ').map(g => g.trim()) : [],
    duration: movie.Runtime || 'N/A',
    description: movie.Plot || 'No description available',
    year: movie.Year,
    director: movie.Director,
    actors: movie.Actors,
    language: movie.Language,
    country: movie.Country,
    awards: movie.Awards,
    boxOffice: movie.BoxOffice,
    showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
    price: 12.99,
    featured: false
  };
};

/**
 * Search and format movies
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of formatted movies
 */
export const searchAndFormatMovies = async (query) => {
  const results = await searchMovies(query);
  return results.map(formatMovieData);
};

/**
 * Get trending/popular movies (using popular search terms)
 * @returns {Promise<Array>} - Array of formatted movies
 */
export const getPopularMovies = async () => {
  const popularTerms = ['avengers', 'batman', 'spiderman', 'inception', 'matrix', 'interstellar'];
  const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
  return await searchAndFormatMovies(randomTerm);
};
