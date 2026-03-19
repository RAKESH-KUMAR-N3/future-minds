const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// Create user (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
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
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reset Password (Admin only)
router.put('/:id/reset-password', verifyToken, isAdmin, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ success: false, message: 'Password is required' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.json({ success: true, message: 'Passcode updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
