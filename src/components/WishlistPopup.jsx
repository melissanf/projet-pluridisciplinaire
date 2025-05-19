import React from 'react';
import './WishlistPopup.css';

const WishlistPopup = ({ isOpen, onClose, voeux }) => {
  if (!isOpen) return null;

  return (
    <div className="wishlist-modal-overlay" onClick={onClose}>
      <div
        className="wishlist-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wishlist-modal-header">
          <h2>Liste des vœux de l’enseignant</h2>
          <button className="wishlist-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="wishlist-modal-body">
          {voeux.length === 0 ? (
            <p>Aucun vœu enregistré pour cet enseignant.</p>
          ) : (
            <ul className="wishlist-list">
              {voeux.map((voeu, i) => (
                <li key={i} className="wishlist-item">
                  <strong>Module :</strong> {voeu.module || '—'} <br />
                  <strong>Niveau :</strong> {voeu.niveau || '—'} <br />
                  <strong>Types d’enseignement :</strong>{' '}
                  {voeu.teachingTypes && voeu.teachingTypes.length > 0
                    ? voeu.teachingTypes.join(', ')
                    : '—'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPopup;
