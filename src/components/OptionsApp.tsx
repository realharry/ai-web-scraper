import React, { useState, useEffect } from 'react';

interface Settings {
  llmProvider: string;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

const defaultSettings: Settings = {
  llmProvider: 'openai',
  apiKey: '',
  model: 'gpt-3.5-turbo',
  maxTokens: 1000,
  temperature: 0.7,
};

const OptionsApp: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Load saved settings
    chrome.storage.sync.get(['aiSettings'], (result) => {
      if (result.aiSettings) {
        setSettings({ ...defaultSettings, ...result.aiSettings });
      }
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await chrome.storage.sync.set({ aiSettings: settings });
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaveMessage('Settings reset to defaults. Click Save to apply.');
  };

  const llmProviders = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'google', label: 'Google AI' },
    { value: 'local', label: 'Local Model' },
  ];

  const modelOptions = {
    openai: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'],
    anthropic: ['claude-3-haiku', 'claude-3-sonnet', 'claude-3-opus'],
    google: ['gemini-pro', 'gemini-pro-vision'],
    local: ['ollama-llama2', 'ollama-codellama', 'custom'],
  };

  return (
    <div className="options-container">
      <header className="options-header">
        <h1>🤖 AI Web Scraper - Settings</h1>
        <p>Configure your AI models and preferences</p>
      </header>

      <main className="options-content">
        <section className="settings-section">
          <h2>🧠 AI Model Configuration</h2>
          
          <div className="form-group">
            <label htmlFor="llmProvider">LLM Provider:</label>
            <select
              id="llmProvider"
              value={settings.llmProvider}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                llmProvider: e.target.value,
                model: modelOptions[e.target.value as keyof typeof modelOptions][0]
              }))}
            >
              {llmProviders.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <select
              id="model"
              value={settings.model}
              onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value }))}
            >
              {modelOptions[settings.llmProvider as keyof typeof modelOptions]?.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="apiKey">API Key:</label>
            <input
              id="apiKey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Enter your API key"
            />
            <small>Your API key is stored locally and never shared.</small>
          </div>

          <div className="form-group">
            <label htmlFor="maxTokens">Max Tokens:</label>
            <input
              id="maxTokens"
              type="number"
              min="100"
              max="4000"
              value={settings.maxTokens}
              onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Temperature ({settings.temperature}):</label>
            <input
              id="temperature"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            />
            <small>Lower values make output more focused, higher values more creative</small>
          </div>
        </section>

        <section className="settings-section">
          <h2>📊 Data Management</h2>
          <p>Scraped data is automatically saved to local storage and can be exported as CSV or JSON files.</p>
          
          <button 
            onClick={() => chrome.storage.local.clear()}
            className="clear-btn"
          >
            🗑️ Clear All Stored Data
          </button>
        </section>

        <div className="action-buttons">
          <button onClick={handleReset} className="reset-btn">
            🔄 Reset to Defaults
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="save-btn"
          >
            {isSaving ? '💾 Saving...' : '💾 Save Settings'}
          </button>
        </div>

        {saveMessage && (
          <div className={`save-message ${saveMessage.includes('Error') ? 'error' : 'success'}`}>
            {saveMessage}
          </div>
        )}
      </main>
    </div>
  );
};

export default OptionsApp;