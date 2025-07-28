const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pointsAwarded = Math.floor(Math.random() * 10) + 1;

    user.totalPoints += pointsAwarded;
    await user.save();

    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsAwarded
    });
    await claimHistory.save();

    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    const usersWithRank = users.map((u, index) => ({
      ...u.toJSON(),
      rank: index + 1
    }));

    const io = req.app.get('io');
    io.emit('rankingsUpdated', usersWithRank);
    io.emit('pointsClaimed', {
      userId: user._id,
      userName: user.name,
      pointsAwarded,
      newTotalPoints: user.totalPoints
    });

    res.json({
      success: true,
      pointsAwarded,
      userName: user.name,
      newTotalPoints: user.totalPoints,
      claimId: claimHistory._id
    });

  } catch (error) {
    console.error('Error claiming points:', error);
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { userId, limit = 50 } = req.query;
    
    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const history = await ClaimHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('userId', 'name');

    res.json(history);
  } catch (error) {
    console.error('Error fetching claim history:', error);
    res.status(500).json({ error: 'Failed to fetch claim history' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalClaims = await ClaimHistory.countDocuments();
    const totalPointsAwarded = await ClaimHistory.aggregate([
      { $group: { _id: null, total: { $sum: '$pointsAwarded' } } }
    ]);

    const stats = {
      totalClaims,
      totalPointsAwarded: totalPointsAwarded[0]?.total || 0,
      averagePointsPerClaim: totalClaims > 0 ? (totalPointsAwarded[0]?.total || 0) / totalClaims : 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router; 