// Background service worker for AI Web Scraper extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Web Scraper extension installed');
});

// Handle action click to open sidepanel
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.sidePanel.open({ tabId: tab.id });
  }
});

// Handle messages from content script and sidepanel
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SCRAPE_CONTENT') {
    handleContentScraping(message, sendResponse);
    return true; // Keep message channel open for async response
  }
});

async function handleContentScraping(message: any, sendResponse: Function) {
  try {
    // Use the tab ID from the message payload instead of sender.tab.id
    const tabId = message.tabId;
    if (!tabId) {
      throw new Error('No tab ID provided in message');
    }
    
    // Forward scraping request to content script
    const response = await chrome.tabs.sendMessage(tabId, {
      type: 'EXTRACT_CONTENT',
      selector: message.selector,
      extractionType: message.extractionType
    });
    sendResponse({ success: true, data: response });
  } catch (error) {
    console.error('Error in content scraping:', error);
    sendResponse({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}