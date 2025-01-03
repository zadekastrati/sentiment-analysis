const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');  // Sequelize's Op for query operators
const User = require('../models/users');
const sequelize = require('sequelize'); // Ensure sequelize is imported for fn, col

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists (case-insensitive)
    const existingUser = await User.findOne({
      where: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), email.toLowerCase()),
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate token and respond
    const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("User object from database:", user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a token with the user's ID
    console.log("User data before token generation:", user);
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Generated Token:", token);
    console.log("Decoded Token:", jwt.decode(token)); 
    res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    // The userId will be available from the token, attached in the authMiddleware
    const userId = req.userId;

    // Ensure userId is defined
    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided in the request' });
    }

    // Fetch the user from the database
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data without sensitive information
    res.status(200).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, getUser };
