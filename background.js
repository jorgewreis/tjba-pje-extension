chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content_script.js']
    });
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['content_style.css']
    });
  }
});