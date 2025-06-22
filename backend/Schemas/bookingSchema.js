import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tenant
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Owner
    required: true
  },
  username: { type: String, required: true }, // Tenant name snapshot

  // Optional: add booking status, dates
  status: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;