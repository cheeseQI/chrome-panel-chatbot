import { sendMessage, setLocalStorage } from './utils.js';
import { PRODUCT_PANEL } from './messageTypes.js';

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
  if (!productPanel) {
    return;
  }

  const tagsToRemove = ['img', 'line', 'polyline', 'svg'];
  const cleanedProductPanel = removeTagsFromElement(productPanel, tagsToRemove);

  const productPanelContent = cleanedProductPanel.innerText;
  setLocalStorage("productPanelContent", productPanelContent);

  sendMessage({ type: PRODUCT_PANEL, content: productPanelContent });
}

sendProductPanel();
