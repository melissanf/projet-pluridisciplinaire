import React from 'react';
import './PopupCommentaire.css';

const PopupCommentaire = ({
  isOpen,
  setIsOpen,
  commentText,
  setCommentText,
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    const trimmed = commentText.trim();
    if (!trimmed) {
      alert("Le commentaire ne peut pas être vide.");
      return;
    }

    // Nouveau commentaire à stocker
    const newComment = {
      id: Date.now(),
      text: trimmed,
      date: new Date().toLocaleString(),
      auteur: localStorage.getItem('userRole') || 'inconnu',
    };

    // Lire les anciens commentaires
    const anciens = JSON.parse(localStorage.getItem('commentaires')) || [];

    // Ajouter le nouveau
    const updated = [...anciens, newComment];
    localStorage.setItem('commentaires', JSON.stringify(updated));

    // Réinitialisation
    setIsOpen(false);
    setCommentText('');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3 className="popup-title">Ajouter un commentaire</h3>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Écrivez votre commentaire ici..."
          className="textarea-commentaire"
          rows={6}
        />

        <div className="popup-buttons">
          <button className="button-blue" onClick={handleSubmit}>
            Envoyer
          </button>

          <button
            className="button-outline"
            onClick={() => {
              setIsOpen(false);
              setCommentText('');
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCommentaire;
