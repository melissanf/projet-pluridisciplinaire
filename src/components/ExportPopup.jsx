import React from 'react';
import './ExportPopup.css';

const ExportPopup = ({ onClose, onExport }) => {
  const handleExportClick = (fileType) => {
    onExport(fileType); // Calls the export function with the selected file type
    onClose(); // Closes the popup
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Choisissez le format d'exportation</h3>
        <div className="popup-buttons">
          <button
            className="button-excel"
            onClick={() => handleExportClick('excel')}
          >
            Exporter en Excel
          </button>
          <button
            className="button-pdf"
            onClick={() => handleExportClick('pdf')}
          >
            Exporter en PDF
          </button>
        </div>
        <button className="button-close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;
