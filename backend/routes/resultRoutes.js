const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const verifyToken = require('../middleware/verifyToken');

// Save a new result (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { testId, testTitle, score, total, percentage, timeTaken } = req.body;
    const result = new Result({
      userId: req.user.id,
      username: req.user.username,
      testId,
      testTitle,
      score,
      total,
      percentage,
      timeTaken: timeTaken || 0
    });
    await result.save();
    res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get results for the logged-in user (protected)
router.get('/my', verifyToken, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all results (admin)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 }).limit(100);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
