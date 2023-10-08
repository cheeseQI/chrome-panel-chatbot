export function sendMessage(messageObject, callback) {
  chrome.runtime.sendMessage(messageObject, callback);
}
  
export function setLocalStorage(key, value) {
  let obj = {};
  obj[key] = value;
  chrome.storage.local.set(obj, function() {
    if (chrome.runtime.lastError) {
      console.error('An error occurred: ' + chrome.runtime.lastError.message);
    } else {
      console.log('Data successfully saved.');
    }
  });
}

async function getLocalStorageAsync(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function(result) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result[key]);
    });
  });
}

export async function getLocalStorage(key) {
  try {
    const result = await getLocalStorageAsync(key);
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
