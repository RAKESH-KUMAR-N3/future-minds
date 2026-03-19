const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const verifyToken = require('../middleware/verifyToken');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// Get tests by role and type (public — students need to browse)
router.get('/', async (req, res) => {
  try {
    const { role, type } = req.query;
    const query = {};
    if (role) query.role = role;
    if (type) query.type = type;
    const tests = await Test.find(query);
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create test (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete test (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update questions for a test (Admin only)
router.put('/:id/questions', verifyToken, isAdmin, async (req, res) => {
  try {
    const { questions } = req.body;
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { $set: { questions } },
      { new: true, runValidators: true }
    );
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    res.json({ success: true, test });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
