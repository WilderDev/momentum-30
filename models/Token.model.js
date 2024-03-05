// * IMPORTS
const mongoose = require('mongoose');

// * SCHEMA
const TokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

// * EXPORTS
module.exports = mongoose.model('Token', TokenSchema);
