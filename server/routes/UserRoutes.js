const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create or update user on login
router.post('/login', async (req, res) => {
  const { email, name } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, name });
  } else {
    user.name = name;
  }
  await user.save();
  res.json(user);
});

router.get('/:email/coins', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.json({ coinBalance: user.coinBalance, coinHistory: user.coinHistory });
  });
  
  module.exports = router;
  