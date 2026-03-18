const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const verifyToken = require('../middleware/verifyToken');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

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

// Get all results (admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 }).limit(200);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get stats summary (admin only) — avg score, total submissions
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const results = await Result.find();
    const total = results.length;
    const avgScore = total > 0
      ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / total)
      : 0;
    res.json({ total, avgScore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get personal stats (student) — total tests, avg, XP, spark data
router.get('/my-stats', verifyToken, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id });
    const total = results.length;
    const avgScore = total > 0 
      ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / total) 
      : 0;
    
    // XP calculation: 10XP per correct answer
    const totalXP = results.reduce((sum, r) => sum + (r.score * 10), 0);
    
    // Spark Chart Logic: Count tests per weekday for the last 7 days
    const spark = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat or just last 7 entries
    // Let's just group by last 5 results as heights for now, or last 5 days
    const recent = results.slice(-5).map(r => r.percentage);
    
    res.json({ total, avgScore, totalXP, recent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
