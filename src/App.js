
import React, { useState, useEffect } from "react";
import "./App.css";
import SpreadsheetGrid from "./component/SpreadsheetGrid";
import * as XLSX from "xlsx";
import * as math from "mathjs";
import { IoIosSave } from "react-icons/io";


// Utility functions for supported operations
const sum = (range) => range.reduce((acc, val) => acc + parseFloat(val || 0), 0);
const average = (range) => sum(range) / range.length;
const max = (range) => Math.max(...range);
const min = (range) => Math.min(...range);
const count = (range) => range.filter((val) => !isNaN(parseFloat(val))).length;




const evaluateFormula = (formula, spreadsheet) => {
  if (!formula) {
    return "Error! Formula is empty or invalid.";
  }
  formula = formula.trim().toUpperCase();

  const regex = /([A-Z]+)(\d+)/g; // Match cell references like A1, B2
  let parsedFormula = formula.replace(regex, (_, col, row) => {
    const colIndex = col.charCodeAt(0) - 65; // Convert column letter to index
    const rowIndex = parseInt(row, 10) - 1; // Convert row number to index
    return spreadsheet[rowIndex]?.[colIndex] || 0; // Fetch cell value
  });

  // Handle supported functions (SUM, AVERAGE, etc.)
  if (parsedFormula.includes("SUM")) {
    parsedFormula = parsedFormula.replace(/SUM\((.*?)\)/g, (_, range) => {
      const cells = range.split(",").map((ref) => evaluateFormula(ref, spreadsheet));
      return sum(cells);
    });
  }
  if (parsedFormula.includes("AVERAGE")) {
    parsedFormula = parsedFormula.replace(/AVERAGE\((.*?)\)/g, (_, range) => {
      const cells = range.split(",").map((ref) => evaluateFormula(ref, spreadsheet));
      return average(cells);
    });
  }
  if (parsedFormula.includes("MAX")) {
    parsedFormula = parsedFormula.replace(/MAX\((.*?)\)/g, (_, range) => {
      const cells = range.split(",").map((ref) => evaluateFormula(ref, spreadsheet));
      return max(cells);
    });
  }
  if (parsedFormula.includes("MIN")) {
    parsedFormula = parsedFormula.replace(/MIN\((.*?)\)/g, (_, range) => {
      const cells = range.split(",").map((ref) => evaluateFormula(ref, spreadsheet));
      return min(cells);
    });
  }
  if (parsedFormula.includes("COUNT")) {
    parsedFormula = parsedFormula.replace(/COUNT\((.*?)\)/g, (_, range) => {
      const cells = range.split(",").map((ref) => evaluateFormula(ref, spreadsheet));
      return count(cells);
    });
  }

  // Evaluate the final parsed formula
  try {
    return math.evaluate(parsedFormula);
  } catch (error) {
    return "Error! Invalid formula.";
  }
};



const App = () => {
  const [spreadsheet, setSpreadsheet] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [formula, setFormula] = useState("");
 // Already set as an empty string


  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const initialGrid = Array(64).fill().map(() => Array(64).fill(""));
    setSpreadsheet(initialGrid);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newSpreadsheet = [...spreadsheet];
    newSpreadsheet[rowIndex][colIndex] = value;
    setSpreadsheet(newSpreadsheet);
  };

  const handleFormulaChange = (event) => {
    setFormula(event.target.value);
  };

  const applyFormula = () => {
    if (!selectedCell) {
      alert("Select a cell to apply the formula.");
      return;
    }
    const { row, col } = selectedCell;
    const result = evaluateFormula(formula, spreadsheet);
    const newSpreadsheet = [...spreadsheet];
    newSpreadsheet[row][col] = result;
    setSpreadsheet(newSpreadsheet);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setFormula(spreadsheet[rowIndex][colIndex]);
  };

  const saveSpreadsheet = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(spreadsheet);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Spreadsheet");
    XLSX.writeFile(workbook, "spreadsheet.xlsx");
  };

  const addColumn = () => {
    const newSpreadsheet = [...spreadsheet];
    newSpreadsheet.forEach((row) => row.push(""));
    setSpreadsheet(newSpreadsheet);
  };

  const addRow = () => {
    const newRow = Array(spreadsheet[0]?.length || 64).fill("");
    setSpreadsheet([...spreadsheet, newRow]);
  };

  const applyStyle = (style) => {
    if (!selectedCell) {
      alert('Select a cell to apply the style.');
      return;
    }

    const { row, col } = selectedCell;
    const newSpreadsheet = [...spreadsheet];
    const cell = newSpreadsheet[row][col];
    if (style === 'bold') {
      newSpreadsheet[row][col] = `<b>${cell}</b>`;
    } else if (style === 'italic') {
      newSpreadsheet[row][col] = `<i>${cell}</i>`;
    } else if (style === 'underline') {
      newSpreadsheet[row][col] = `<u>${cell}</u>`;
    }
    setSpreadsheet(newSpreadsheet);
  };

  const applyColor = (color) => {
    if (!selectedCell) {
      alert('Select a cell to apply the color.');
      return;
    }

    const { row, col } = selectedCell;
    const newSpreadsheet = [...spreadsheet];
    const cell = newSpreadsheet[row][col];
    newSpreadsheet[row][col] = `<span style="color: ${color}">${cell}</span>`;
    setSpreadsheet(newSpreadsheet);
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <h1>Google Sheets</h1>
          <div className="toolbar">
            <button onClick={() => applyStyle('bold')}>Bold</button>
            <button onClick={() => applyStyle('italic')}>Italic</button>
            <button onClick={() => applyStyle('underline')}>Underline</button>
            <button>Text Color <input type="color" onChange={(e) => applyColor(e.target.value)} /></button>
            <button onClick={addRow}>Add Row</button>
            <button onClick={addColumn}>Add Column</button>
            <button onClick={saveSpreadsheet}><IoIosSave style={{fontSize:"20px" ,color:"black"}} />Save Spreadsheet</button>
          </div>

        </nav>
      </header>
     

      <main>
        <div className="controls">
          <input
            id="formulaBar"
            type="text"
            placeholder="Enter formula or value here"
            value={formula}
            onChange={handleFormulaChange}
          />
          <button onClick={applyFormula}>Apply Formula</button>
        </div>

        <SpreadsheetGrid
          spreadsheet={spreadsheet}
          handleCellClick={handleCellClick}
          handleCellChange={handleCellChange}
        />
      </main>
    </div>
  );
};

export default App;
