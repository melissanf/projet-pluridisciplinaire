import React, { useEffect, useState } from 'react';
import './Dashboardorga.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaChalkboardTeacher, FaBookOpen, FaGraduationCap, FaExclamationTriangle, FaProjectDiagram, FaEdit, FaChartBar } from 'react-icons/fa';

const Dashboardorga = ({ userRole }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    enseignants: '0',
    modules: '0',
    specialites: '0'
  });

  const [alertMessage, setAlertMessage] = useState('');
//pour tester
  useEffect(() => {
    const defaultStats = {
      enseignants: '130',
      modules: '12',
      specialites: '3'
    };

    const storedStats = JSON.parse(localStorage.getItem('stats'));
    if (storedStats) {
      setStats(storedStats);
    } else {
      localStorage.setItem('stats', JSON.stringify(defaultStats));
      setStats(defaultStats);
    }

    const storedAlert = localStorage.getItem('alertMessage');
    if (storedAlert) {
      setAlertMessage(storedAlert);
    } else {
      const defaultAlert = "CERTAINES HEURES D'ENSEIGNEMENT EXCÉDENTAIRES ONT ÉTÉ DÉTECTÉES";
      localStorage.setItem('alertMessage', defaultAlert);
      setAlertMessage(defaultAlert);
    }
  }, []);

  const handleGoToOrganigramme = () => {
    navigate('/organigramme');
  };

  return (
    <div className="dashboardorga-container">
      <Sidebar />
      <main className="orga-main-content">
        <div className="orga-header">
          <h1 className="welcome">
             Bienvenue sur votre tableau de bord
          </h1>
          <button className="orga-button" onClick={handleGoToOrganigramme}>
            <FaProjectDiagram style={{ marginRight: '8px' }} />
            Voir l’organigramme
          </button>
        </div>

        {userRole === 'chef' && (
          <div className="alert-message">
            <FaExclamationTriangle style={{ marginRight: '8px' }} />
            <strong>Problème détecté :</strong> {alertMessage}
          </div>
        )}

        <div className="cards-wrapper">
          <div className="card">
            <h2><FaChalkboardTeacher style={{ marginRight: '6px' }} /> Total d’Enseignants</h2>
            <p>{stats.enseignants}</p>
          </div>

          <div className="card">
            <h2><FaBookOpen style={{ marginRight: '6px' }} /> Modules</h2>
            <p>{stats.modules}</p>
          </div>

          <div className="card">
            <h2><FaGraduationCap style={{ marginRight: '6px' }} /> Spécialités</h2>
            <p>{stats.specialites}</p>
          </div>
        </div>

        {userRole === 'chef' && (
          <div className="actions">
            <button className="orga-action-btn">
              <FaEdit style={{ marginRight: '8px' }} />
              Modifier l’organigramme
            </button>
            <button className="orga-action-btn" onClick={() => alert("Statistiques affichées en console")}>
              <FaChartBar style={{ marginRight: '8px' }} />
              Voir statistiques
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboardorga;
