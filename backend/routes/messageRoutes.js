const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Send a new message
router.post('/', async (req, res) => {
  try {
    const { senderId, recipientId, message } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Place this FIRST so it doesn’t get treated as a userId in the next route
router.get('/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const sent = await Message.find({ senderId: userId }).distinct('recipientId');
    const received = await Message.find({ recipientId: userId }).distinct('senderId');

    const all = [...new Set([...sent, ...received])]; // Remove duplicates
    res.json(all);
  } catch (err) {
    console.error('Error getting conversations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET messages between two users
router.get('/:userId/:otherUserId', async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: otherUserId },
        { senderId: otherUserId, recipientId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
