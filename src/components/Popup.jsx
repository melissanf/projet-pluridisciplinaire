import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ module, onSave, onClose }) => {
  const [updatedModule, setUpdatedModule] = useState({ ...module });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);  // Debug: Check input change
    setUpdatedModule({ ...updatedModule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with updated data:', updatedModule);  // Debug: Verify form data before saving
    onSave(updatedModule);  // Pass the updated module back to the parent
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Ajouter un module: {module.nom}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Module:
            <input
              type="text"
              name="nom"
              value={updatedModule.nom}
              onChange={handleChange}
            />
          </label>
          <label>
            Spécialité:
            <input
              type="text"
              name="specialite"
              value={updatedModule.specialite}
              onChange={handleChange}
            />
          </label>
          <label>
            Semestre:
            <input
              type="text"
              name="semestre"
              value={updatedModule.semestre}
              onChange={handleChange}
            />
          </label>
          <label>
            Enseignant:
            <input
              type="text"
              name="enseignant"
              value={updatedModule.enseignant}
              onChange={handleChange}
            />
          </label>
          <div className="popup-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;