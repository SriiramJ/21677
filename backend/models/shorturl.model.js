import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date },
  clickCount: { type: Number, default: 0 }
});

export default mongoose.model('ShortUrl', shortUrlSchema);
