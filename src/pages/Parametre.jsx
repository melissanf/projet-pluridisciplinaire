import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Parametre.css';

const Parametre = () => {
  const [showAlerts, setShowAlerts] = useState(true);
  const [autoEmails, setAutoEmails] = useState(true);
  const [displayMode, setDisplayMode] = useState('arborescence');

  const handleSave = () => {
    alert('Paramètres enregistrés avec succès !');
    console.log({
      showAlerts,
      autoEmails,
      displayMode
    });
  };

  const handleReset = () => {
    setShowAlerts(true);
    setAutoEmails(true);
    setDisplayMode('arborescence');
    alert('Paramètres réinitialisés.');
  };

  return (
    <div className="parametre-wrapper">
      <Sidebar />
      <div className="parametre-container">
        <h1 className="parametre-title">Paramètres </h1>

        {/* Section 1: Notifications */}
        <section className="parametre-section">
          <h2>Notifications</h2>
          <div className="switch-item">
            <label>
              <input
                type="checkbox"
                checked={showAlerts}
                onChange={() => setShowAlerts(!showAlerts)}
              />
              <span className="slider"></span>
              Activer les alertes de dépassement d'heures
            </label>
          </div>
          <div className="switch-item">
            <label>
              <input
                type="checkbox"
                checked={autoEmails}
                onChange={() => setAutoEmails(!autoEmails)}
              />
              <span className="slider"></span>
              Envoyer des emails automatiques aux enseignants
            </label>
          </div>
        </section>

        {/* Section 2: Mode d'affichage */}
        <section className="parametre-section">
          <h2>Affichage de l’organigramme</h2>
          <div className="radio-group">
            {['arborescence', 'grille', 'listes'].map((mode) => (
              <label key={mode}>
                <input
                  type="radio"
                  value={mode}
                  checked={displayMode === mode}
                  onChange={(e) => setDisplayMode(e.target.value)}
                />
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </label>
            ))}
          </div>
        </section>

        {/* Section 3: Légende par spécialité */}
        <section className="parametre-section">
          <h2>Couleurs des spécialités</h2>
          <div className="legend">
            <div><span className="dot informatique"></span> Informatique</div>
            <div><span className="dot ia"></span> Intelligence Artificielle</div>
            <div><span className="dot reseaux"></span> Réseaux</div>
            
          </div>
        </section>

        {/* Buttons */}
        <div className="parametre-buttons">
          <button onClick={handleReset}>Réinitialiser</button>
          <button className="save-btn" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default Parametre;
