const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: String, enum: ['inquilino', 'arrendador'], required: true },
  profilePicture: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);