// Background service worker for DeepSeek Exporter

// Install event
chrome.runtime.onInstalled.addListener(() => {
  console.log('DeepSeek Exporter extension installed');
});

// Handle extension icon click (optional - can be used for quick actions)
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('chat.deepseek.com')) {
    chrome.tabs.sendMessage(tab.id, { action: 'exportCurrent' });
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('chat.deepseek.com')) {
    console.log('DeepSeek page loaded');
  }
});

// Context menu (optional - for right-click export)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'exportDeepSeek',
    title: 'Export conversation to Markdown',
    contexts: ['page'],
    documentUrlPatterns: ['https://chat.deepseek.com/*']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'exportDeepSeek') {
    chrome.tabs.sendMessage(tab.id, { action: 'exportCurrent' });
  }
});
