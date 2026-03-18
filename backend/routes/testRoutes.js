const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// Get tests by role and type
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

// Create test (Admin only in real app, keeping simple for now)
router.post('/', async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
