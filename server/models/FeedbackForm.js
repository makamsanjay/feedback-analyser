const mongoose = require('mongoose');

const feedbackFormSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  formLink: String,
  createdBy: String, // email
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeedbackForm', feedbackFormSchema);
