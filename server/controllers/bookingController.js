const Booking = require('../models/MyBooking');
const Car = require('../models/Car');

exports.createBooking = async (req, res, next) => {
  try {
    const { carId, pickupLocation, dropLocation, pickupDate, totalAmount } = req.body;
    const normalizedPickup = typeof pickupLocation === 'string' ? pickupLocation : pickupLocation?.address || '';
    const normalizedDrop = typeof dropLocation === 'string' ? dropLocation : dropLocation?.address || '';

    if (!carId || !normalizedPickup || !normalizedDrop || !pickupDate || totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({ message: 'Please provide all booking details' });
    }

    const car = await Car.findById(carId);
    if (!car || !car.available) {
      return res.status(404).json({ message: 'Car not available' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      car: car._id,
      pickupLocation: normalizedPickup,
      dropLocation: normalizedDrop,
      pickupDate,
      totalAmount,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id.toString();
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to view these bookings' });
    }

    const bookings = await Booking.find({ user: userId })
      .populate('car', 'name type pricePerKm available')
      .populate('driver', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car', 'name type pricePerKm available')
      .populate('driver', 'name email phone')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    next(error);
  }
};
