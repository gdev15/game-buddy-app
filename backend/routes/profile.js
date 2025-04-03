const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// GET profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST profile
router.post('/:userId', async (req, res) => {
  const { username, favoriteGames, skillLevel, availability } = req.body;
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      { username, favoriteGames, skillLevel, availability },
      { upsert: true, new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
