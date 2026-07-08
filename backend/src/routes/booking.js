const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Create a new booking
router.post('/', auth, async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            userId: req.user._id,
            userName: req.user.name
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all bookings for a user
router.get('/user', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings for a photographer
router.get('/photographer', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ photographerId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status
router.patch('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Only allow status updates
        if (req.body.status) {
            booking.status = req.body.status;
        }
        
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a booking
router.delete('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Only allow deletion if the booking is pending
        if (booking.status !== 'pending') {
            return res.status(400).json({ message: 'Cannot delete non-pending bookings' });
        }
        
        await booking.remove();
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 