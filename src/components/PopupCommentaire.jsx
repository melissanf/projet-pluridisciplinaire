import React from 'react';
import './PopupCommentaire.css'; // Ensure the correct path

const PopupCommentaire = ({
  isOpen,
  setIsOpen,
  commentText,
  setCommentText,
  onSubmit
}) => {
  if (!isOpen) return null; // Return null if the popup is not open

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Ajouter un commentaire</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Écrivez votre commentaire ici..."
          className="textarea-commentaire"
        />
        <div className="popup-buttons">
          <button className="button-blue" onClick={onSubmit}>
            Ajouter
          </button>
          <button className="button-outline" onClick={() => setIsOpen(false)}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCommentaire;
