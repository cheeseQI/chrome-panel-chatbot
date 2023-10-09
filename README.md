# chrome-panel-chatbot

## Description  
This Chrome extension serves as a specialized chatbot that operates exclusively on the detail pages of a specified website. Utilizing OpenAI language models, the bot answers questions related to a product's information. Additionally, the chatbot allows you to share this information with your friends if you find it useful.

## Prerequisites
- Node.js and npm installed
- Google Chrome Browser

## Installation  
1. Clone the repository
2. Navigate to the project directory: `cd chrome-panel-chatbot`
3. Install required npm packages: `npm install`
4. Open Google Chrome and navigate to `chrome://extensions/`
5. Enable Developer mode and click "Load unpacked"
6. Load  your project folder into Chrome

## Development
- For active development, compile your assets using Webpack: `npx webpack --config webpack.config.js`
- The `webpack.config.js` is pre-configured to bundle your source files

## Usage
1. Click the extension icon in the Chrome toolbar or Ctrl(Command for mac) + B
2. Input your query related to a product in the chat interface
3. Receive real-time, AI-generated answers

**Dev**
- Run `npx webpack --config webpack.config.js`
