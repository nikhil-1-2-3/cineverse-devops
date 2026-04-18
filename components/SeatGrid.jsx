import { motion } from 'framer-motion';
import '../styles/SeatGrid.css';

const SeatGrid = ({ 
  selectedSeats = [], 
  bookedSeats = [], 
  onSeatSelect,
  rows = 10,
  seatsPerRow = 12 
}) => {
  const rows_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const getSeatStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (seatId) => {
    if (getSeatStatus(seatId) !== 'booked') {
      onSeatSelect(seatId, bookedSeats);
    }
  };

  // Generate some random booked seats for demo
  const demoBookedSeats = bookedSeats.length > 0 ? bookedSeats : [
    'C3', 'C4', 'D7', 'D8', 'E5', 'F10', 'G2', 'G3', 'H6', 'H7', 'I9'
  ];

  return (
    <div className="seat-grid-container">
      {/* Screen */}
      <div className="screen-container">
        <div className="screen" />
        <p className="screen-text">SCREEN</p>
      </div>

      {/* Seats */}
      <div className="seats-wrapper">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <span className="row-label">{rows_labels[rowIndex]}</span>
            
            <div className="seats-row">
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const seatId = `${rows_labels[rowIndex]}${seatNumber}`;
                const status = getSeatStatus(seatId);
                const isBooked = demoBookedSeats.includes(seatId);

                return (
                  <motion.div
                    key={seatId}
                    className={`seat ${status} ${isBooked && status === 'available' ? 'booked' : ''}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: (rowIndex * seatsPerRow + seatIndex) * 0.01 
                    }}
                    whileHover={status === 'available' || status === 'selected' ? { scale: 1.2 } : {}}
                    whileTap={status === 'available' || status === 'selected' ? { scale: 0.9 } : {}}
                    onClick={() => handleSeatClick(seatId)}
                    layout
                  />
                );
              })}
            </div>

            <span className="row-label">{rows_labels[rowIndex]}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-seat available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-seat selected pulse" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-seat booked" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
