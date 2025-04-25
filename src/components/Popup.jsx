import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ data, onSave, onClose, isAdding }) => {
  const [updatedData, setUpdatedData] = useState({ ...data });
  const [isFormValid, setIsFormValid] = useState(true);

  // Dynamically set form fields based on the page
  const formFields = window.location.pathname.includes('modules')
    ? [
        { label: 'Module', name: 'nom' },
        { label: 'Spécialité', name: 'specialite' },
        { label: 'Semestre', name: 'semestre' },
        { label: 'Enseignant', name: 'enseignant' }
      ]
    : [
        { label: 'Nom', name: 'nom' },
        { label: 'Spécialité', name: 'specialite' },
        { label: 'Semestre', name: 'semestre' },
        { label: 'Module', name: 'module' }
      ];

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic form validation (ensuring no field is empty)
    const isValid = Object.values(updatedData).every((field) => field.trim() !== '');
    setIsFormValid(isValid);
    
    if (isValid) {
      onSave(updatedData); // Save the updated data
    } else {
      alert('Tous les champs doivent être remplis.');
    }
  };

  useEffect(() => {
    // Ensure the data is updated when props change (e.g., if you open the popup for a new item)
    setUpdatedData({ ...data });
  }, [data]);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3 className="popup-title">
          {isAdding
            ? (window.location.pathname.includes('modules') ? 'Ajouter un module' : 'Ajouter un enseignant')
            : (window.location.pathname.includes('modules') ? 'Modifier le module' : 'Modifier l\'enseignant')}
        </h3>
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} className="form-field">
              <label>{field.label}:</label>
              <input
                type="text"
                name={field.name}
                value={updatedData[field.name] || ''}
                onChange={handleChange}
                className={isFormValid ? '' : 'input-error'}
              />
            </div>
          ))}
          {!isFormValid && <p className="error-message">Tous les champs doivent être remplis.</p>}
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
