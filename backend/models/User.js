const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

userSchema.virtual('rank').get(function() {
  return this._rank || 0;
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema); 