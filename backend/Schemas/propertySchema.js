import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema({
   userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Owner
    required: true
  },
  propType: { type: String, required: true },      // e.g., "Apartment", "House"
  adType: { type: String, required: true },         // e.g., "Rent", "Sale"
  isAvailable: { type: Boolean, default: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },        // Owner contact
  amount: { type: Number, required: true },
  images: [String],                                 // URLs or paths
  additionalInfo: { type: String }
}, { timestamps: true });

