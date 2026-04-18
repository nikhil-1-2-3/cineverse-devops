import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatBooking from './pages/SeatBooking';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import { BookingProvider } from './context/BookingContext';
import './styles/global.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/booking/:id" element={<SeatBooking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </BookingProvider>
  );
}

export default App;
