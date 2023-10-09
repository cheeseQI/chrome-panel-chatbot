const ORIGIN = 'https://www.saatva.com';
let currentProductPanelContent = '';

// Adding Event Listeners
chrome.tabs.onUpdated.addListener(handleTabUpdated);
initializeSidePanel();

// Initialize Side Panel function
async function initializeSidePanel() {
  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (error) {
    console.error(error);
  }
}

// Tab Updated Handler function
async function handleTabUpdated(tabId, tab) {
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
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
}


