const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  favoriteGames: [String],
  skillLevel: String,
  availability: String
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
