import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Admin user created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
