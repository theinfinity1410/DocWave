const express = require('express');
const router = express.Router();
const claudeWrapper = require('./aiService');

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await claudeWrapper.generateContent(prompt);
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate content' });
    }
});

module.exports = router;
