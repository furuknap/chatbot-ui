# chatbot-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Prompts used:
Initial project description and walkthrough: https://chatgpt.com/share/67aa59b9-1400-800b-b1bd-7dbaf4f3fdfb

## Tasks in Cline
###Create home page UI:
- On the home page, I would like to have a simple chatbot interface. It should call an API for Claude and show the full conversation for each turn of the interaction. Basically a normal chatbot UI.

### Add Ollaman support
- I would like to add support for local Ollama LLMs to this chatbot. I would like there to be a dropdown on the home page to swap between Claude and Ollama. When choosing Ollama, I would like to also see alit of available models that are installed locally.
-
```
OK, when I run this, I get an error like this:

"Sorry, I encountered an error. Please try again."

In my network console I see this:

{"model":"phi4:latest","created_at":"2025-02-10T19:31:48.9431868Z","message":{"role":"assistant","content":"Good"},"done":false}
{"model":"phi4:latest","created_at":"2025-02-10T19:31:49.1702368Z","message":{"role":"assistant","content":" morning"},"done":false}
{"model":"phi4:latest","created_at":"2025-02-10T19:31:49.3927366Z","message":{"role":"assistant","content":"!"},"done":false}
{"model":"phi4:latest","created_at":"2025-02-10T19:31:49.6116067Z","message":{"role":"assistant","content":" While"},"done":false}
{"model":"phi4:latest","created_at":"2025-02-10T19:31:49.8371079Z","message":{"role":"assistant","content":" I"},"done":false}
{"model":"phi4:latest","created_at":"2025-02-10T19:31:50.060226Z","message":
```



