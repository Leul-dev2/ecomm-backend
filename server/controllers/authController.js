import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, password });
  res.status(201).json({ message: 'Admin registered' });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username });
};
