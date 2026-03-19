require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'futureminds_secret_key_2026';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Models
const User = require('./models/User');
const Test = require('./models/Test');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    seedData();
  })
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/doubts', require('./routes/doubtRoutes'));

// ── LOGIN ──────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ── SEED DATA ──────────────────────────────────────────────────
const seedData = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      // First run — create admin with hashed password
      const hashedPassword = await bcrypt.hash('password', 10);
      await User.create({ username: 'admin', password: hashedPassword, role: 'admin', name: 'System Admin' });
      console.log('✅ Seeded Admin User');
    } else if (!adminExists.password.startsWith('$2b$')) {
      // Old plain-text password found — auto-migrate to bcrypt
      adminExists.password = await bcrypt.hash('password', 10);
      await adminExists.save();
      console.log('✅ Migrated admin password to bcrypt');
    }


    const questionsMap = {
      'Math Adventure':    [
        { questionText: 'What is 4 + 3?', options: ['5', '6', '7', '8'], correctAnswer: 2, explanation: '4 + 3 = 7' },
        { questionText: 'What is 10 - 4?', options: ['4', '5', '6', '7'], correctAnswer: 2, explanation: '10 - 4 = 6' },
        { questionText: 'Which number is the biggest?', options: ['12', '9', '21', '15'], correctAnswer: 2, explanation: '21 is the biggest' },
        { questionText: 'What is 3 × 3?', options: ['6', '9', '12', '8'], correctAnswer: 1, explanation: '3 × 3 = 9' },
        { questionText: 'What comes after 19?', options: ['18', '20', '21', '22'], correctAnswer: 1, explanation: '19 + 1 = 20' },
      ],
      'Super Science': [
        { questionText: 'What do plants need to make food?', options: ['Water only', 'Sunlight only', 'Sunlight and CO₂', 'Soil only'], correctAnswer: 2, explanation: 'Plants use sunlight and CO₂ in photosynthesis' },
        { questionText: 'What is the center of our solar system?', options: ['Earth', 'Moon', 'Sun', 'Mars'], correctAnswer: 2, explanation: 'The Sun is at the center of our solar system' },
        { questionText: 'Water boils at what temperature (°C)?', options: ['90', '95', '100', '110'], correctAnswer: 2, explanation: 'Water boils at 100°C at sea level' },
        { questionText: 'Which gas do we breathe in?', options: ['CO₂', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctAnswer: 2, explanation: 'We breathe in Oxygen' },
        { questionText: 'How many bones are in the human body?', options: ['196', '206', '216', '226'], correctAnswer: 1, explanation: 'Adult humans have 206 bones' },
      ],
      'Coding Challenge': [
        { questionText: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Machine Language', 'Home Tool Markup Language', 'None of these'], correctAnswer: 0, explanation: 'HTML = HyperText Markup Language' },
        { questionText: 'Which symbol is used for comments in JavaScript?', options: ['#', '//', '/*', '--'], correctAnswer: 1, explanation: '// is used for single-line comments in JS' },
        { questionText: 'What is the output of 2 ** 3 in Python?', options: ['6', '8', '9', '5'], correctAnswer: 1, explanation: '2 ** 3 = 2³ = 8' },
        { questionText: 'Which of these is a loop in programming?', options: ['if', 'else', 'for', 'def'], correctAnswer: 2, explanation: 'for is a loop construct' },
        { questionText: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Color Style Sheets'], correctAnswer: 1, explanation: 'CSS = Cascading Style Sheets' },
      ],
      'Space Quiz': [
        { questionText: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctAnswer: 1, explanation: 'There are 8 planets in our solar system' },
        { questionText: 'What is the closest planet to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correctAnswer: 2, explanation: 'Mercury is the closest planet to the Sun' },
        { questionText: 'Which planet has rings around it?', options: ['Jupiter', 'Saturn', 'Neptune', 'All of these'], correctAnswer: 3, explanation: 'Jupiter, Saturn, Uranus, and Neptune all have rings!' },
        { questionText: 'What do we call a shooting star?', options: ['Comet', 'Asteroid', 'Meteor', 'Satellite'], correctAnswer: 2, explanation: 'A shooting star is actually a meteor burning up' },
        { questionText: 'How long does Earth take to go around the Sun?', options: ['24 hours', '28 days', '365 days', '7 days'], correctAnswer: 2, explanation: 'Earth takes 365 days (1 year) to orbit the Sun' },
      ]
    };

    const testCount = await Test.countDocuments();
    if (testCount === 0) {
      // No tests at all — create from scratch
      await Test.create([
        { title: 'Math Adventure', role: 'sub-junior', type: 'mock', category: 'Math', duration: 15, questions: questionsMap['Math Adventure'] },
        { title: 'Super Science', role: 'junior', type: 'mock', category: 'Science', duration: 20, questions: questionsMap['Super Science'] },
        { title: 'Coding Challenge', role: 'senior', type: 'grand', category: 'Coding', duration: 30, questions: questionsMap['Coding Challenge'] },
        { title: 'Space Quiz', role: 'sub-junior', type: 'grand', category: 'General', duration: 15, questions: questionsMap['Space Quiz'] },
      ]);
      console.log('✅ Seeded Tests with Questions');
    } else {
      // Patch any existing tests that have empty questions
      const emptyTests = await Test.find({ $or: [{ questions: { $size: 0 } }, { questions: { $exists: false } }] });
      for (const t of emptyTests) {
        if (questionsMap[t.title]) {
          t.questions = questionsMap[t.title];
          await t.save();
          console.log(`✅ Patched questions for: ${t.title}`);
        }
      }
    }

  } catch (err) {
    console.error('Seed error:', err);
  }
};

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
