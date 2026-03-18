const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');
const verifyToken = require('../middleware/verifyToken');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// Student: Post a new doubt
router.post('/', verifyToken, async (req, res) => {
  try {
    const { question, subject } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }
    const doubt = new Doubt({
      studentId: req.user.id,
      username: req.user.username,
      subject: subject || 'General',
      question: question.trim()
    });
    await doubt.save();
    res.status(201).json({ success: true, doubt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Student: Get my doubts
router.get('/my', verifyToken, async (req, res) => {
  try {
    const doubts = await Doubt.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get all doubts
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const doubts = await Doubt.find().sort({ createdAt: -1 });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Respond to a doubt
router.put('/:id/respond', verifyToken, isAdmin, async (req, res) => {
  try {
    const { response } = req.body;
    if (!response || !response.trim()) {
      return res.status(400).json({ success: false, message: 'Response is required' });
    }
    const doubt = await Doubt.findByIdAndUpdate(
      req.params.id,
      { response: response.trim(), status: 'answered', respondedAt: new Date() },
      { new: true }
    );
    if (!doubt) return res.status(404).json({ success: false, message: 'Doubt not found' });
    res.json({ success: true, doubt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Delete a doubt
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Doubt.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
