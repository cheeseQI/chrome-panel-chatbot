const ORIGIN = 'https://www.saatva.com';

let currentProductPanelContent = ''; 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("received message: " + message.type);
  if (message.type === 'PRODUCT_PANEL') {
    currentProductPanelContent = message.content;
  } else if (message.type === 'GET_PRODUCT_PANEL') {
    sendResponse({ type: 'PRODUCT_PANEL', content: currentProductPanelContent });
  }
});
  

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) {
    return;
  }
  const url = new URL(tab.url);

  if (url.origin === ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'public/sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});