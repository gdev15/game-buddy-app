const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile'); // ✅ Correct model

// ✅ GET total user count - must go first
router.get('/count/all', async (req, res) => {
  try {
    const count = await UserProfile.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error('Error counting users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET user by UID - should go before :userId
router.get('/user/:uid', async (req, res) => {
  try {
    const user = await UserProfile.findOne({ userId: req.params.uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (err) {
    console.error('Error fetching user by UID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET profile by Firebase UID
router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ POST or update user profile
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