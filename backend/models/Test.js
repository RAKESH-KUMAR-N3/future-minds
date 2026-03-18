const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  role: { type: String, enum: ['sub-junior', 'junior', 'senior'], required: true },
  type: { type: String, enum: ['mock', 'grand'], required: true },
  category: { type: String, required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [String],
    correctAnswer: Number, // Index of options
    explanation: String
  }],
  duration: { type: Number, default: 30 }, // in minutes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
