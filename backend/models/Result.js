const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  testTitle: { type: String, required: true },
  score: { type: Number, required: true },        // correct answers count
  total: { type: Number, required: true },         // total questions
  percentage: { type: Number, required: true },
  timeTaken: { type: Number, default: 0 },         // in seconds
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
