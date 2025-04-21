import React, { useState } from 'react';
import './WishList.css';

function WishList() {
  const [moduleName, setModuleName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    cours: false,
    td: false,
    tp: false,
  });

  const toggleType = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="wishlist-container">
      <button className="back-button">← Retour</button>
      <h1 className="title">Liste de Voeux</h1>
      <p className="subtitle">Gérez vos souhaits d’enseignement pour l’année à venir</p>

      <div className="form-card">
        {/* Nom du module */}
        <div className="form-row">
          <div className="form-group">
            <label>Nom du module</label>
            <input
              type="text"
              placeholder="Entrez le nom du module"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
        </div>

        {/* Type d’enseignement */}
        <div className="form-group-full">
          <label className="section-title">Type d’enseignement</label>
          <div className="toggle-buttons-row">
            <button
              className={`toggle-button ${selectedTypes.cours ? 'active' : ''}`}
              onClick={() => toggleType('cours')}
            >
              Cours
            </button>
            <button
              className={`toggle-button ${selectedTypes.td ? 'active' : ''}`}
              onClick={() => toggleType('td')}
            >
              TD
            </button>
            <button
              className={`toggle-button ${selectedTypes.tp ? 'active' : ''}`}
              onClick={() => toggleType('tp')}
            >
              TP
            </button>
          </div>
        </div>
      </div>

      <button className="add-button">+ Nouveau voeu</button>
    </div>
  );
}

export default WishList;
