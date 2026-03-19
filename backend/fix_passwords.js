require('dotenv').config({path: './.env'});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  const users = await User.find({ role: { $ne: 'admin' }, passcode: { $exists: false } });
  console.log('Found ' + users.length + ' users without a passcode.');
  for (let u of users) {
    u.passcode = '123456';
    u.password = await bcrypt.hash('123456', 10);
    await u.save();
    console.log('Reset ' + u.username);
  }
  console.log('Done.');
  process.exit(0);
});
