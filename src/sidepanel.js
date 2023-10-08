import { sendMessage, setLocalStorage, getLocalStorage } from './utils.js';
import { GET_PRODUCT_PANEL, PRODUCT_PANEL } from './messageTypes.js';
// import { OpenAI } from "langchain/llms/openai";

document.addEventListener('DOMContentLoaded', () => {
  initProductPanel();
  initUserInput();
});

function initProductPanel() {
  console.log('Initializing product panel...');
  sendMessage({ type: GET_PRODUCT_PANEL }, (response) => {
    if (response && response.type === PRODUCT_PANEL) {
      document.getElementById('productInfo').innerHTML = response.content;
    }

  });
}

function initUserInput() {
  console.log('Initializing user input bar...');
  const existingInput = getLocalStorage('output');
  if (existingInput) {
    document.getElementById('displayOutput').innerText = existingInput;
  }

  document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    setLocalStorage('output', userInput);
    //document.getElementById('displayOutput').innerText = getAnswers();
    document.getElementById('displayOutput').innerText = userInput;
  });
}

// async function getAnswers() {
//   const llm = new OpenAI({
//     temperature: 0.9,
//   });

//   const text = "What would be a good company name for a company that makes colorful socks?";

//   const llmResult = await llm.predict(text);
//   return llmResult;
// }