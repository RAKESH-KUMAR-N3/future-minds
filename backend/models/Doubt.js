const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  subject: { type: String, default: 'General' },
  question: { type: String, required: true },
  response: { type: String, default: '' },
  respondedAt: { type: Date },
  status: { type: String, enum: ['pending', 'answered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doubt', doubtSchema);
