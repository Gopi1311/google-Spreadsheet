
import React from 'react';

const generateColumnLabels = (count) => {
  const labels = [];
  for (let i = 0; i < count; i++) {
    let label = '';
    let temp = i;
    while (temp >= 0) {
      label = String.fromCharCode((temp % 26) + 65) + label;
      temp = Math.floor(temp / 26) - 1;
    }
    labels.push(label);
  }
  return labels;
};

const SpreadsheetGrid = ({ spreadsheet = [[]], handleCellClick, handleCellChange }) => {
  const renderGrid = () => {
    // Safely handle undefined or empty spreadsheet
    const colCount = spreadsheet[0]?.length || 0;
    const rowCount = spreadsheet.length;

    // Generate dynamic column labels
    const colLabels = generateColumnLabels(colCount);

    // Render the row labels (1, 2, 3...)
    const rowLabels = Array.from({ length: rowCount }, (_, index) => index + 1);

    return (
      <div id="spreadsheet">
        {/* Column headers */}
        <div className="row">
          <div className="cell header"></div>
          {colLabels.map((label, index) => (
            <div key={index} className="cell header">{label}</div>
          ))}
        </div>

        {/* Rows */}
        {rowLabels.map((rowLabel, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="cell header">{rowLabel}</div> {/* Row label */}
            {(spreadsheet[rowIndex] || []).map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                contentEditable
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onBlur={(e) => handleCellChange(rowIndex, colIndex, e.target.textContent)}
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="spreadsheet-container">
      {renderGrid()}
    </div>
  );
};

export default SpreadsheetGrid;
