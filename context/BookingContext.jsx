import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveBookings, getBookings } from '../utils/storage';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = getBookings();
    setBookings(storedBookings);
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      saveBookings(bookings);
    }
  }, [bookings]);

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setSelectedTheatre(null);
    setSelectedSeats([]);
  };

  const selectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const selectTheatre = (theatre) => {
    setSelectedTheatre(theatre);
  };

  const toggleSeat = (seatId, bookedSeats = []) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      } else {
        if (prev.length >= 8) {
          alert('Maximum 8 seats allowed per booking');
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const addBooking = () => {
    const newBooking = {
      id: `booking_${Date.now()}`,
      movie: selectedMovie,
      showtime: selectedShowtime,
      theatre: selectedTheatre,
      seats: [...selectedSeats],
      total: selectedSeats.length * selectedMovie.price,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    setBookings(prev => [...prev, newBooking]);
    clearSelection();
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => {
      const updated = prev.filter(b => b.id !== bookingId);
      saveBookings(updated);
      return updated;
    });
  };

  const clearSelection = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedTheatre(null);
    setSelectedSeats([]);
  };

  const value = {
    selectedMovie,
    selectedShowtime,
    selectedTheatre,
    selectedSeats,
    bookings,
    selectMovie,
    selectShowtime,
    selectTheatre,
    toggleSeat,
    addBooking,
    cancelBooking,
    clearSelection
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
