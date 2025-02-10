<template>
  <div class="app-container">
    <h1>Claude Chat</h1>
    <ChatBot />
  </div>
</template>

<script>
import ChatBot from './components/ChatBot.vue'

export default {
  name: 'App',
  components: {
    ChatBot
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
