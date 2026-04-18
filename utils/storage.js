const BOOKINGS_KEY = 'cineverse_bookings';

export const saveBookings = (bookings) => {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return true;
  } catch (error) {
    console.error('Error saving bookings to localStorage:', error);
    return false;
  }
};

export const getBookings = () => {
  try {
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error getting bookings from localStorage:', error);
    return [];
  }
};

export const clearBookings = () => {
  try {
    localStorage.removeItem(BOOKINGS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing bookings from localStorage:', error);
    return false;
  }
};
