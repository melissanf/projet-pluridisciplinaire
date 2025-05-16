import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Chemin relatif à ajuster selon ta structure
import './Parametre.css';

const Parametre = () => {
  const [alertesActives, setAlertesActives] = useState(true);
  const [emailsAutomatiques, setEmailsAutomatiques] = useState(true);
  const [modeAffichage, setModeAffichage] = useState('listes');

  const handleSave = () => {
    alert('Paramètres enregistrés !');
    console.log({
      alertesActives,
      emailsAutomatiques,
      modeAffichage
    });
  };

  const handleResetAffectations = () => {
    alert('Affectations réinitialisées !');
  };

  const handleReset = () => {
    setAlertesActives(false);
    setEmailsAutomatiques(false);
    setModeAffichage('listes');
    alert('Paramètres réinitialisés !');
  };

  const handleTestAlertes = () => {
    alert(`Test des alertes lancé (${alertesActives ? "activées" : "désactivées"})`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="parametre-container">
        <h1>Paramètres</h1>

        <section>
          <h2>Notifications</h2>
          <div className="switch-container">
            <label>
              <input
                type="checkbox"
                checked={alertesActives}
                onChange={() => setAlertesActives(!alertesActives)}
              />
              <span className="slider"></span>
              Activer alertes de dépassement d'heures
            </label>
          </div>
          <div className="switch-container">
            <label>
              <input
                type="checkbox"
                checked={emailsAutomatiques}
                onChange={() => setEmailsAutomatiques(!emailsAutomatiques)}
              />
              <span className="slider"></span>
              Envoyer des emails automatiques aux enseignants
            </label>
          </div>
        </section>

        <section>
          <h2>Affichage de l'organigramme</h2>
          <div className="radio-group">
            {['listes', 'arborescence', 'grille'].map((mode) => (
              <label key={mode}>
                <input
                  type="radio"
                  value={mode}
                  checked={modeAffichage === mode}
                  onChange={(e) => setModeAffichage(e.target.value)}
                />
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </label>
            ))}
          </div>

          <div className="couleurs-specialite">
            <div><span className="dot informatique"></span> Informatique</div>
            <div><span className="dot ia"></span> IA</div>
            <div><span className="dot reseaux"></span> Réseaux</div>
            <div><span className="dot orangex"></span> Orangex</div>
          </div>
        </section>

        <div className="buttons">
          <button onClick={handleResetAffectations}>RÉINITIALISER LES AFFECTATIONS</button>
          <div className="button-row">
            <button onClick={handleReset}>RÉINITIALISER</button>
            <button onClick={handleTestAlertes}>TESTER LES ALERTES</button>
          </div>
          <button className="save-btn" onClick={handleSave}>ENREGISTRER LES PARAMÈTRES</button>
        </div>
      </div>
    </div>
  );
};

export default Parametre;
