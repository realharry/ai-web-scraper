import React, { useState, useCallback } from 'react';
import ExtractionForm from './ExtractionForm';
import ResultsTable from './ResultsTable';
import ExportControls from './ExportControls';

interface ScrapingResult {
  data: any[];
  headers: string[];
  totalElements: number;
}

const SidePanelApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ScrapingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExtraction = useCallback(async (selector: string, extractionType: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.id) {
        throw new Error('No active tab found');
      }

      // Send message to background script with tab ID
      const response = await chrome.runtime.sendMessage({
        type: 'SCRAPE_CONTENT',
        selector,
        extractionType,
        tabId: tab.id
      });

      if (response.success) {
        setResults(response.data);
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSaveToStorage = useCallback(async () => {
    if (!results) return;
    
    try {
      const timestamp = new Date().toISOString();
      const storageKey = `scrape_${timestamp}`;
      
      await chrome.storage.local.set({
        [storageKey]: {
          ...results,
          timestamp,
          url: window.location.href
        }
      });
      
      alert('Data saved to local storage!');
    } catch (err) {
      alert('Failed to save data to storage');
    }
  }, [results]);

  return (
    <div className="sidepanel-container">
      <header className="sidepanel-header">
        <h1>🤖 AI Web Scraper</h1>
        <p>Extract structured data from web pages</p>
      </header>

      <main className="sidepanel-content">
        <ExtractionForm 
          onExtract={handleExtraction}
          isLoading={isLoading}
        />

        {error && (
          <div className="error-message">
            <span>❌ Error: {error}</span>
          </div>
        )}

        {results && (
          <>
            <div className="results-summary">
              <h3>📊 Results ({results.totalElements} elements found)</h3>
            </div>
            
            <ResultsTable 
              data={results.data}
              headers={results.headers}
            />

            <ExportControls 
              data={results}
              onSaveToStorage={handleSaveToStorage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default SidePanelApp;