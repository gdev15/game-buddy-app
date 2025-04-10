const express = require('express');
const router = express.Router();
const LfgPost = require('../models/LfgPost');

// POST: Create LFG post
router.post('/', async (req, res) => {
  try {
    const {
      game,
      platform,
      skillLevel,
      region,
      availability,
      description,
      userId,
      username // grab username from the request body
    } = req.body;

    const newPost = new LfgPost({
      game,
      platform,
      skillLevel,
      region,
      availability,
      description,
      userId,
      username // explicitly save it
    });

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

// POST: Send join request to a post
router.post('/:postId/request', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, username } = req.body;

    const post = await LfgPost.findById(postId);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Prevent duplicate requests
    const alreadyRequested = post.requests.find(
      (req) => req.userId === userId
    );

    if (alreadyRequested) {
      return res.status(400).json({ error: 'You already sent a request' });
    }

    post.requests.push({ userId, username });
    await post.save();

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: View all join requests for a specific post
router.get('/:postId/requests', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await LfgPost.findById(postId);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post.requests || []);
  } catch (error) {
    console.error('Error fetching join requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Accept or reject a request
router.post('/:postId/request/:requestUserId/response', async (req, res) => {
  try {
    const { postId, requestUserId } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    const post = await LfgPost.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const request = post.requests.find(req => req.userId === requestUserId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = status;
    await post.save();

    res.json({ message: `Request ${status}` });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: All posts created by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await LfgPost.find({ userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
