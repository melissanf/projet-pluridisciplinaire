import React, { useState } from 'react';
import './PopupEchange.css'; // On va aussi prévoir un petit CSS sympa

const PopupEchange = ({ ligne, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ ...ligne });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Envoie les nouvelles données
  };

  return (
    <div className="popup-echange-overlay">
      <div className="popup-echange-content">
        <h2>Modifier la ligne</h2>
        <form onSubmit={handleSubmit} className="popup-echange-form">
          {[
            'Section', 'Module', 'Cours',
            'TD1', 'TD2', 'TD3', 'TD4',
            'TP1', 'TP2', 'TP3', 'TP4'
          ].map((field) => (
            <div key={field} className="form-group">
              <label>{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="popup-echange-buttons">
            <button type="submit" className="btn-submit">Valider</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEchange;
