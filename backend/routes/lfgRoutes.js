const express = require('express');
const router = express.Router();
const LfgPost = require('../models/LfgPost');

// POST: Create LFG post
router.post('/', async (req, res) => {
  try {
    const newPost = new LfgPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Fetch all LFG posts
router.get('/', async (req, res) => {
  try {
    const posts = await LfgPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
