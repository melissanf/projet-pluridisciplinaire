import React, { useState } from 'react';
import './PopupConfirm.css';

const PopupConfirm = ({ expectedCode, onSuccess, onFailure, onClose, role }) => {
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');

  // Sécurité : ne pas tenter de rendre si code ou rôle manquant
  if (!expectedCode) return null;

  // Fonction pour formater le titre avec la première lettre en majuscule
  const formatRole = (role) => {
    if (!role || typeof role !== 'string') return 'Utilisateur';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const handleConfirm = () => {
    if (codeInput === expectedCode) {
      setError('');
      onSuccess();
    } else {
      setError('Code incorrect. Veuillez réessayer.');
      setCodeInput('');
      if (onFailure) onFailure();
    }
  };

  return (
    <div className="popup-confirm-overlay">
      <div className="popup-confirm-content">
        <h2>Confirmation - {formatRole(role)}</h2>
        <p>Veuillez entrer le code de confirmation :</p>
        <input
          type="text"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Code de validation"
          className="popup-confirm-input"
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
