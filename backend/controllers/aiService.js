const axios = require('axios');

class ClaudeWrapper {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async generateContent(prompt) {
        try {
            const response = await axios.post(
                this.apiUrl,
                { prompt },
                {
                    headers: { 'Authorization': `Bearer ${this.apiKey}` },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error with Claude AI generation:', error.message);
            throw new Error('Failed to generate content');
        }
    }
}

const claudeWrapper = new ClaudeWrapper(process.env.CLAUDE_API_URL, process.env.CLAUDE_API_KEY);
module.exports = claudeWrapper;