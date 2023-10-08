import { sendMessage, setLocalStorage, getLocalStorage } from './utils.js';
import { GET_PRODUCT_PANEL, PRODUCT_PANEL } from './messageTypes.js';

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

async function initUserInput() {
  console.log('Initializing user input bar...');
  
  const existingOutput = await getLocalStorage('output');
  if (existingOutput) {
    document.getElementById('displayOutput').innerText = existingOutput;
  }

  document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    try {
      const productPanelContent = await getLocalStorage('productPanelContent');
      const responseText = await getAnswers("given former chat information about the product: " + productPanelContent + existingOutput + " answer my question: " + userInput);
      const cleanedResponseText = responseText.replace(/^"|"$/g, '');  // Remove starting and ending quotes if present
      document.getElementById('displayOutput').innerHTML = cleanedResponseText;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}

async function getAnswers(userInput) {
  try {
    const response = await fetch(' https://uq5jah82da.execute-api.us-east-1.amazonaws.com/apidev/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: userInput, 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text(); 
    setLocalStorage('output', data);
    return data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}