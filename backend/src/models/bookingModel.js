import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photographer: {
    type: String,
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
  packageType: {
    type: String,
    required: true,
    enum: ['wedding', 'portrait', 'event', 'commercial', 'portfolio', 'fashion']
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  specialRequirements: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 