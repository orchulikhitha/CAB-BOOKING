const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getUsers, updateUser, deleteUser, getBookings, updateBooking, getCars, addCar, updateCar, deleteCar } = require('../controllers/adminController');
const { protectAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', protectAdmin, getUsers);
router.put('/users/:id', protectAdmin, updateUser);
router.delete('/users/:id', protectAdmin, deleteUser);
router.get('/bookings', protectAdmin, getBookings);
router.put('/bookings/:id', protectAdmin, updateBooking);
router.get('/cars', protectAdmin, getCars);
router.post('/cars', protectAdmin, upload.single('image'), addCar);
router.put('/cars/:id', protectAdmin, upload.single('image'), updateCar);
router.delete('/cars/:id', protectAdmin, deleteCar);

module.exports = router;
