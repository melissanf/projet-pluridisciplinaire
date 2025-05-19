import React, { useState } from 'react';
import './PopupConfirm.css';

const PopupConfirm = ({ expectedCode, onSuccess, onFailure, onClose }) => {
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (codeInput === expectedCode) {
      setError('');
      onSuccess();
    } else {
      setError('Code invalide, veuillez réessayer.');
      setCodeInput(''); // Vider le champ pour retaper
      onFailure();
    }
  };

  return (
    <div className="popup-confirm-overlay">
      <div className="popup-confirm-content">
        <h3>Confirmation - Chef de département</h3>
        <p>Veuillez entrer le code de confirmation :</p>
        <input
          type="text"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Code à 4 chiffres"
          className="popup-confirm-input"
          autoFocus
        />
        {error && <p className="popup-confirm-error">{error}</p>}
        <div className="popup-confirm-buttons">
          <button className="popup-confirm-btn confirm" onClick={handleConfirm}>
            Valider
          </button>
          <button className="popup-confirm-btn cancel" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;
