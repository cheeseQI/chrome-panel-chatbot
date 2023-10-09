import { setLocalStorage } from './utils.js';

// Remove unnecessary tags
function removeTagsFromElement(element, tagsToRemove) {
  const clonedElement = element.cloneNode(true);
  tagsToRemove.forEach(tag => {
    const elements = clonedElement.querySelectorAll(tag);
    elements.forEach(element => element.remove());
  });
  return clonedElement;
}

// Send web product information to panel
function sendProductPanel() {
  const productPanel = document.getElementById('productPanel');
  if (!productPanel) {
    return;
  }

  const tagsToRemove = ['img', 'line', 'polyline', 'svg'];
  const cleanedProductPanel = removeTagsFromElement(productPanel, tagsToRemove);

  const productPanelContent = cleanedProductPanel.innerText;
  setLocalStorage("productPanelContent", productPanelContent);
  setLocalStorage("output", "");
}

sendProductPanel();
