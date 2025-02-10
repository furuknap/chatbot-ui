<template>
  <div class="chat-container">
    <div class="model-selection">
      <select v-model="selectedProvider" class="provider-select">
        <option value="claude">Claude</option>
        <option value="ollama">Ollama</option>
      </select>
      <select v-if="selectedProvider === 'ollama'" 
              v-model="selectedModel" 
              class="model-select"
              :disabled="loadingModels">
        <option value="" disabled>Select a model</option>
        <option v-for="model in ollamaModels" 
                :key="model.name" 
                :value="model.name">
          {{ model.name }}
        </option>
      </select>
    </div>
    <div class="chat-history" ref="chatHistory">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.role]">
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="input-container">
      <textarea 
        v-model="userInput" 
        @keyup.enter.exact.prevent="sendMessage"
        placeholder="Type your message here..."
        rows="3"
      ></textarea>
      <button @click="sendMessage" :disabled="isLoading">Send</button>
    </div>
  </div>
</template>

<script>
import { sendMessage as claudeApi } from '../api/claude.js';
import { sendMessage as ollamaApi, listModels } from '../api/ollama.js';

export default {
  name: 'ChatBot',
  data() {
    return {
      messages: [],
      userInput: '',
      isLoading: false,
      selectedProvider: 'claude',
      selectedModel: '',
      ollamaModels: [],
      loadingModels: false
    };
  },
  mounted() {
    if (this.selectedProvider === 'ollama') {
      this.fetchOllamaModels();
    }
  },
  watch: {
    selectedProvider(newValue) {
      if (newValue === 'ollama') {
        this.fetchOllamaModels();
      }
    }
  },
  methods: {
    async fetchOllamaModels() {
      this.loadingModels = true;
      try {
        this.ollamaModels = await listModels();
        if (this.ollamaModels.length > 0) {
          this.selectedModel = this.ollamaModels[0].name;
        }
      } catch (error) {
        console.error('Error fetching Ollama models:', error);
      } finally {
        this.loadingModels = false;
      }
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;
      
      // Add user message to chat
      const userMessage = {
        role: 'user',
        content: this.userInput.trim()
      };
      this.messages.push(userMessage);
      this.userInput = '';
      this.isLoading = true;

      try {
        // Call appropriate API based on selected provider
        let response;
        if (this.selectedProvider === 'claude') {
          response = await claudeApi(this.messages);
        } else {
          if (!this.selectedModel) {
            throw new Error('Please select an Ollama model');
          }
          response = await ollamaApi(this.selectedModel, this.messages);
        }
        
        // Add assistant's response to chat
        this.messages.push({
          role: 'assistant',
          content: response.message
        });
      } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'Sorry, I encountered an error. Please try again.';
        
        if (error.response) {
          errorMessage = `Error: ${error.response.data.error || error.response.statusText}`;
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`;
        }
        
        this.messages.push({
          role: 'assistant',
          content: errorMessage
        });
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const chatHistory = this.$refs.chatHistory;
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }
};
</script>

<style scoped>
.model-selection {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.provider-select,
.model-select {
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
  min-width: 120px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chat-history {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.message {
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.message.assistant {
  background: #e9ecef;
  color: #212529;
  margin-right: auto;
}

.input-container {
  display: flex;
  gap: 10px;
}

textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
