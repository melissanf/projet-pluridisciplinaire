import React, { useEffect, useState } from 'react';
import './Dashboardtec.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboardtec = () => {
  const [userInfo, setUserInfo] = useState({
    //j'ajoute les info pour tester 
    name: 'Utilisateur',
    role: '',
    department: '',
    assignments: ['L3 isil A', 'ING1 Sec-B', 'ING1 Sec-C'],
    assignedModules: ['Analyse 2 TD-G1', 'PROB-STAT 1 COURS', 'Analyse numérique TD-G4'],
    workHours: { done: 14, target: 24 },
  });

  const navigate = useNavigate();

  // Charger les données user depuis localStorage au montage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Vérifie et complète les propriétés attendues
      setUserInfo({
        name: parsedUser.name || 'Utilisateur',
        role: parsedUser.role || '',
        department: parsedUser.department || '',
        assignments: parsedUser.assignments || [],
        assignedModules: parsedUser.assignedModules || [],
        workHours: parsedUser.workHours || { done: 0, target: 0 },
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goToWishList = () => {
    navigate('/wishlist');
  };

  const progressPercent = userInfo.workHours.target > 0 
    ? (userInfo.workHours.done / userInfo.workHours.target) * 100
    : 0;

  return (
    <div className="dashboardtec-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="welcome">
            Bienvenue <span>{userInfo.name}</span>
          </h1>
          <button className="wishlist-button" onClick={goToWishList}>
            <FontAwesomeIcon icon={faClipboard} /> Liste de Vœux
          </button>
        </div>

        <div className="cards-wrapper">
          <div className="card">
            <h2>Affectations</h2>
            {userInfo.assignments.length === 0 && <p>Aucune affectation</p>}
            {userInfo.assignments.map((affect, index) => (
              <div key={index} className="card-item">
                <span className="dot">📍</span> {affect}
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Modules Assignés</h2>
            {userInfo.assignedModules.length === 0 && <p>Aucun module assigné</p>}
            {userInfo.assignedModules.map((module, index) => (
              <div key={index} className="card-item">
                {module}
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Heures de Charge</h2>
            <p>Heures Effectuées : <strong>{userInfo.workHours.done} h</strong></p>
            <p>Objectif Annuel : <strong>{userInfo.workHours.target} h</strong></p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboardtec;
