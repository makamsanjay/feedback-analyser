const express = require('express');
const router = express.Router();
const FeedbackForm = require('../models/FeedbackForm.js');

router.post('/', async (req, res) => {
  const form = new FeedbackForm(req.body);
  await form.save();
  res.json(form);
});

router.get('/', async (req, res) => {
  const all = await FeedbackForm.find();
  res.json(all);
});

module.exports = router;
