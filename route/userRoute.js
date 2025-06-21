const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send('User already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.send('User registered');
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ _id: user._id, email: user.email }, 'jwtSecret', { expiresIn: '1h' });
  res.json({ token });
});

// Logout (Client should remove token, server is stateless with JWT)
router.post('/logout', (req, res) => {
  // For JWT, logout is handled client-side by deleting the token.
  res.send('Logout successful (delete token on client)');
});

module.exports = router;
