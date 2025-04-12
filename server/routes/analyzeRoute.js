const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { formTitle, responsesText } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(
      `Analyze this feedback titled '${formTitle}':\n\n${responsesText}\n\nGive a short summary of the sentiment and key points.`
    );

    const response = result.response;
    const text = response.text();
    res.json({ summary: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to analyze feedback' });
  }
});


module.exports = router;