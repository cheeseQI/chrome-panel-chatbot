import { setLocalStorage, getLocalStorage } from './utils.js';

// Initialize the app when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initUserInput();
  shareByEmail();
});


async function initUserInput() {
  console.log('Initializing user input bar...');
  
  const existingOutput = await getLocalStorage('output');
  if (existingOutput) {
    document.getElementById('displayOutput').innerText = existingOutput;
  }

  document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    try {
      const responseText = await getAnswers(userInput);
      // Remove starting and ending quotes if present
      const cleanedResponseText = responseText.replace(/^"|"$/g, '');  
      const existingOutput = await getLocalStorage('output');
      setLocalStorage('output', existingOutput + cleanedResponseText);
      document.getElementById('displayOutput').innerHTML = await getLocalStorage('output');
      document.getElementById('userInput').value = "";
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}

// Fetch answers based on user input through API
async function getAnswers(userInput) {
  const productPanelContent = await getLocalStorage('productPanelContent');
  const history = await getLocalStorage('output');
  try {
    const requestBody = JSON.stringify({
      "userInput": userInput,
      "productPanelContent": productPanelContent,
      "history": history
    });

    const response = await fetch('https://uq5jah82da.execute-api.us-east-1.amazonaws.com/apidev/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: requestBody, 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text(); 
    return data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Share gpt generated content by email through API
async function shareByEmail() {
  document.getElementById('shareButton').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value;
    const productPanelContent = await getLocalStorage('productPanelContent');
    if (!validateEmail(email)) {
      alert('Invalid email address.');
      return;
    }

    try {
      const requestBody = JSON.stringify({
        "email": email,
        "productPanelContent": productPanelContent
      });

      const response = await fetch('https://2op4zwyxm5.execute-api.us-east-1.amazonaws.com/apidev/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('Failed to send email.');
      }

      alert('Email sent successfully.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email.');
    }
  });
}

// Format validation
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}