import React, { useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SidebarTeacher from './SidebarTeacher'; // Import de la SidebarTeacher

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="dashboard-container">
      {/* Utilisation de SidebarTeacher */}
      <SidebarTeacher />
      <main className="main-content">
        <div className="content">
          <div className="top-bar">
            <h1 className="welcome">Bienvenue <span>M. Dupont</span></h1>
            <button className="wishlist-button">
              <FontAwesomeIcon icon={faClipboard} /> Liste de Vœux
            </button>
          </div>

          <div className="cards">
            <div className="card">
              <h2>Affectations</h2>
              <div className="card-item"><span className="dot">📍</span>L2 ACAD Sec-C</div>
              <div className="card-item"><span className="dot">📍</span>ING1 Sec-A</div>
            </div>

            <div className="card">
              <h2>Modules Assignés</h2>
              <div className="card-item">Analyse 1 TD-G1</div>
              <div className="card-item">Analyse 2 COURS</div>
              <div className="card-item">Analyse numérique TD-G4</div>
            </div>

            <div className="card">
              <h2>Heures de Charge</h2>
              <p>Heures Effectuées : <strong>180 h</strong></p>
              <p>Objectif Annuel : <strong>240 h</strong></p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;