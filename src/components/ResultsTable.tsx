import React from 'react';

interface ResultsTableProps {
  data: any[];
  headers: string[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data, headers }) => {
  if (data.length === 0) {
    return (
      <div className="no-results">
        <p>No data found with the specified selector.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="row-number">{index + 1}</td>
                {headers.map((header) => (
                  <td key={header}>
                    <div className="cell-content">
                      {typeof row[header] === 'string' && row[header].length > 100
                        ? `${row[header].substring(0, 100)}...`
                        : row[header] || ''
                      }
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;