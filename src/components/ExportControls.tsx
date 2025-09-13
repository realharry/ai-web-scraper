import React from 'react';

interface ExportControlsProps {
  data: {
    data: any[];
    headers: string[];
    totalElements: number;
  };
  onSaveToStorage: () => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({ data, onSaveToStorage }) => {
  const downloadCSV = () => {
    const csvContent = [
      data.headers.join(','),
      ...data.data.map(row => 
        data.headers.map(header => {
          const value = row[header] || '';
          // Escape quotes and wrap in quotes if contains comma
          const escaped = value.toString().replace(/"/g, '""');
          return escaped.includes(',') ? `"${escaped}"` : escaped;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `scraped_data_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify({
      timestamp: new Date().toISOString(),
      url: window.location.href,
      totalElements: data.totalElements,
      headers: data.headers,
      data: data.data
    }, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `scraped_data_${Date.now()}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="export-controls">
      <h4>💾 Export Data</h4>
      <div className="export-buttons">
        <button onClick={onSaveToStorage} className="save-btn">
          📁 Save to Storage
        </button>
        <button onClick={downloadCSV} className="export-btn">
          📊 Download CSV
        </button>
        <button onClick={downloadJSON} className="export-btn">
          📋 Download JSON
        </button>
      </div>
    </div>
  );
};

export default ExportControls;