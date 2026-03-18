const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Create user (Admin action — hashes password)
router.post('/', async (req, res) => {
  try {
    const { username, password, role, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, name: name || username });
    await user.save();
    res.status(201).json({ success: true, user: { id: user._id, username: user.username, role: user.role, name: user.name } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all users (Admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
