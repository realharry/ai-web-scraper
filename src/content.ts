// Content script for AI Web Scraper extension

interface ScrapingResult {
  data: any[];
  headers: string[];
  totalElements: number;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'EXTRACT_CONTENT') {
    try {
      const result = extractContent(message.selector, message.extractionType);
      sendResponse(result);
    } catch (error) {
      console.error('Error in content script:', error);
      sendResponse({ data: [], headers: [], totalElements: 0 });
    }
    return true;
  }
});

function extractContent(selector: string, extractionType: 'text' | 'attributes' | 'html'): ScrapingResult {
  try {
    const elements = document.querySelectorAll(selector);
    const data: any[] = [];
    const headers: string[] = [];

    if (elements.length === 0) {
      return { data: [], headers: [], totalElements: 0 };
    }

    // Determine headers based on extraction type
    switch (extractionType) {
      case 'text':
        headers.push('Element Text');
        break;
      case 'attributes':
        headers.push('Tag Name', 'Attributes', 'Text Content');
        break;
      case 'html':
        headers.push('HTML Content');
        break;
    }

    // Extract data from each element
    elements.forEach((element) => {
      let rowData: any = {};

      switch (extractionType) {
        case 'text':
          rowData = {
            'Element Text': element.textContent?.trim() || ''
          };
          break;
        case 'attributes':
          const attrs: { [key: string]: string } = {};
          Array.from(element.attributes).forEach(attr => {
            attrs[attr.name] = attr.value;
          });
          rowData = {
            'Tag Name': element.tagName.toLowerCase(),
            'Attributes': JSON.stringify(attrs),
            'Text Content': element.textContent?.trim() || ''
          };
          break;
        case 'html':
          rowData = {
            'HTML Content': element.outerHTML
          };
          break;
      }

      data.push(rowData);
    });

    return {
      data,
      headers,
      totalElements: elements.length
    };
  } catch (error) {
    console.error('Error extracting content:', error);
    return { data: [], headers: [], totalElements: 0 };
  }
}

// Inject styles for better UX (optional highlight functionality)
const style = document.createElement('style');
style.textContent = `
  .ai-scraper-highlight {
    outline: 2px solid #4CAF50 !important;
    outline-offset: 2px !important;
    background-color: rgba(76, 175, 80, 0.1) !important;
  }
`;
document.head.appendChild(style);