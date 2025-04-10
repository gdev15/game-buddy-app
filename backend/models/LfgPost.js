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
  userId: String,       // ID of the creator of the post
  username: String,     // Username of the creator

  requests: [
    {
      userId: String,
      username: String,
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      requestedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ]
});

module.exports = mongoose.model('LfgPost', LfgPostSchema);

