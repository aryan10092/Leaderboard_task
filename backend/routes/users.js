const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    
    const usersWithRank = users.map((user, index) => ({
      ...user.toJSON(),
      rank: index + 1
    }));

    res.json(usersWithRank);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'User name is required' });
    }

    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      name: name.trim(),
      totalPoints: 0
    });

    await newUser.save();

    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    const usersWithRank = users.map((user, index) => ({
      ...user.toJSON(),
      rank: index + 1
    }));

    const io = req.app.get('io');
    io.emit('rankingsUpdated', usersWithRank);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router; 