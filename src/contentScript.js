function removeTagsFromElement(element, tagsToRemove) {
  const clonedElement = element.cloneNode(true);
  tagsToRemove.forEach(tag => {
    const elements = clonedElement.querySelectorAll(tag);
    elements.forEach(element => element.remove());
  });
  return clonedElement;
}

function sendProductPanel() {
  const productPanel = document.getElementById('productPanel');
  if (!productPanel) return;

  console.log("About to send message from contentScript.js");

  const tagsToRemove = ['img', 'line', 'polyline', 'svg'];
  const cleanedProductPanel = removeTagsFromElement(productPanel, tagsToRemove);

  const productPanelContent = cleanedProductPanel.innerText;

  chrome.runtime.sendMessage({ type: 'PRODUCT_PANEL', content: productPanelContent });
  console.log("Message sent from contentScript.js");
}

sendProductPanel();
