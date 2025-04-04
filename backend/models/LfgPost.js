const mongoose = require('mongoose');

const LfgPostSchema = new mongoose.Schema({
  game: String,
  platform: String,
  skillLevel: String,
  region: String,
  availability: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LfgPost', LfgPostSchema);
