import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api';

export const listModels = async () => {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/tags`);
    return response.data.models;
  } catch (error) {
    console.error('Ollama API Error:', error);
    throw error;
  }
};

export const sendMessage = async (model, messages) => {
  try {
    const response = await axios.post(`${OLLAMA_API_URL}/chat`, {
      model: model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }, {
      responseType: 'text'
    });

    // Split response into lines and combine all message contents
    const lines = response.data.trim().split('\n');
    const fullMessage = lines
      .map(line => {
        try {
          const parsed = JSON.parse(line);
          return parsed.message.content;
        } catch (e) {
          return '';
        }
      })
      .join('');

    return {
      message: fullMessage
    };
  } catch (error) {
    console.error('Ollama API Error:', error);
    throw error;
  }
};
