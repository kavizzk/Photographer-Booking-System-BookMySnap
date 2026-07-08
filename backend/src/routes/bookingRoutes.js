import express from 'express';
import Booking from '../models/bookingModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new booking
router.post('/', protect, async (req, res) => {
  try {
    const { 
      date, 
      time, 
      packageType, 
      location, 
      specialRequirements, 
      photographerId, 
      photographerName,
      userName,
      duration,
      totalCost
    } = req.body;

    const booking = await Booking.create({
      date,
      time,
      packageType,
      location,
      specialRequirements,
      user: req.user._id,
      photographer: photographerId,
      photographerName,
      userName,
      duration,
      totalCost,
      status: 'pending'
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking (reschedule or cancel)
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Update booking fields
    if (req.body.date) booking.date = req.body.date;
    if (req.body.time) booking.time = req.body.time;
    if (req.body.status) booking.status = req.body.status;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error('Booking update error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    console.error('Booking deletion error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router; 