import React from 'react';
import './Dashboardorg.css'; // Updated the CSS import
import { Link } from 'react-router-dom';

const Dashboardorg = ({ userRole }) => {
  return (
    <div className="dashboard-container">
      <h1>Tableau de bord</h1>

      {userRole === 'chef' ? (
        <>
          <Link to="/organigramme">
            <button className="organigram-btn">ORGANIGRAMME ➝</button>
          </Link>

          <div className="alert">
            <strong>PROBLÈME DÉTECTÉ</strong><br />
            CERTAINES HEURES D'ENSEIGNEMENT EXCÉDENTAIRES ONT ÉTÉ DÉTECTÉES
          </div>

          <div className="actions">
            <button>MODIFIER L’ORGANIGRAMME</button>
            <button>VOIR LES STATISTIQUES GÉNÉRALES</button>
          </div>

          <div className="stats">
            <div><strong>25 à 30</strong><br />TOTAL D’ENSEIGNANTS</div>
            <div><strong>10 à 12</strong><br />Modules</div>
            <div><strong>3</strong><br />Spécialités</div>
          </div>
        </>
      ) : (
        <>
          <h2>Vue d’ensemble de l’organigramme</h2>
          <button className="organigram-btn">ORGANIGRAMME ➝</button>

          <button>FILTRER PAR DÉPARTEMENT ⌄</button>

          <div className="stats">
            <div><strong>58</strong><br />Enseignants</div>
            <div><strong>6</strong><br />Spécialités</div>
            <div><strong>20</strong><br />Modules</div>
          </div>

          <div className="quick-access">
            <button>📚 VOIR ENSEIGNANTS</button>
            <button>📘 VOIR MODULES</button>
            <button>🕘 VOIR ORGANIGRAMME</button>
            <button>💬 AJOUTER UN COMMENTAIRE</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboardorg;
