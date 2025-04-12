const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const User = require('../models/user.js');

router.post('/', async (req, res) => {
  const { formId, userEmail } = req.body;
  const already = await Response.findOne({ formId, userEmail });
  if (already) return res.status(400).json({ msg: 'Already submitted' });

  const response = new Response({ formId, userEmail });
  await response.save();

  await User.updateOne(
    { email: userEmail },
    {
      $inc: { coinBalance: 20 },
      $push: {
        coinHistory: {
          reason: 'Feedback Filled',
          amount: 20,
          date: new Date(),
        },
      },
    }
  );

  res.json({ success: true });
});

router.get('/:email', async (req, res) => {
  const entries = await Response.find({ userEmail: req.params.email }).populate('formId');
  res.json(entries);
});

module.exports = router;
