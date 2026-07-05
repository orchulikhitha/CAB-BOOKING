const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);
router.get('/', protect, getMyBookings);
router.get('/user/:userId', protect, getMyBookings);
router.get('/:id', protect, require('../controllers/bookingController').getBookingById);
router.put('/:id/cancel', protect, require('../controllers/bookingController').cancelBooking);

module.exports = router;
