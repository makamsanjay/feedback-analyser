const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackForm' },
  userEmail: String,
  responseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
