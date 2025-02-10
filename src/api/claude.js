import axios from 'axios';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = process.env.VUE_APP_CLAUDE_API_KEY;

export const sendMessage = async (messages) => {
  try {
    const response = await axios.post(CLAUDE_API_URL, {
      model: 'claude-3-opus-20240229',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });

    return {
      message: response.data.content[0].text
    };
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
};
