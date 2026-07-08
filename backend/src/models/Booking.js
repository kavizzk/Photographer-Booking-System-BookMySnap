const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photographerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photographer',
        required: true
    },
    photographerName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in hours
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 