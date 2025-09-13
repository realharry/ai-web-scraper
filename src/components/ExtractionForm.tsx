import React, { useState } from 'react';

interface ExtractionFormProps {
  onExtract: (selector: string, extractionType: string) => void;
  isLoading: boolean;
}

const ExtractionForm: React.FC<ExtractionFormProps> = ({ onExtract, isLoading }) => {
  const [selector, setSelector] = useState('');
  const [extractionType, setExtractionType] = useState('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selector.trim()) {
      onExtract(selector.trim(), extractionType);
    }
  };

  const commonSelectors = [
    { label: 'All Links', value: 'a' },
    { label: 'All Images', value: 'img' },
    { label: 'All Headings', value: 'h1, h2, h3, h4, h5, h6' },
    { label: 'All Paragraphs', value: 'p' },
    { label: 'Table Rows', value: 'tr' },
    { label: 'List Items', value: 'li' },
  ];

  return (
    <form onSubmit={handleSubmit} className="extraction-form">
      <div className="form-section">
        <label htmlFor="selector">CSS Selector / HTML Tags:</label>
        <input
          id="selector"
          type="text"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          placeholder="e.g., .product-title, #main-content, div.item"
          disabled={isLoading}
          required
        />
        
        <div className="common-selectors">
          <span>Quick select:</span>
          {commonSelectors.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setSelector(item.value)}
              disabled={isLoading}
              className="quick-select-btn"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label htmlFor="extractionType">Extraction Type:</label>
        <select
          id="extractionType"
          value={extractionType}
          onChange={(e) => setExtractionType(e.target.value)}
          disabled={isLoading}
        >
          <option value="text">Text Content</option>
          <option value="attributes">Attributes & Text</option>
          <option value="html">HTML Content</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isLoading || !selector.trim()}
        className="extract-btn"
      >
        {isLoading ? '🔄 Extracting...' : '🚀 Extract Data'}
      </button>
    </form>
  );
};

export default ExtractionForm;