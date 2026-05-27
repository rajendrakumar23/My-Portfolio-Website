const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '🏆' },
  date: { type: Date },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
