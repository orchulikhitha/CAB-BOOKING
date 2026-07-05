const Car = require('../models/Car');

exports.getCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ available: true });
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
