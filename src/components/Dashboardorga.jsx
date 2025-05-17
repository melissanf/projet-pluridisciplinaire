import React, { useEffect, useState } from 'react';
import './Dashboardorga.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import organigrammeS1Data from '../data/OrganigrammeS1.json';
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaGraduationCap,
  FaExclamationTriangle,
} from 'react-icons/fa';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboardorga = ({ userRole }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    enseignants: 0,
    modules: 0,
    specialites: 0,
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [miniTableData, setMiniTableData] = useState([]);

  useEffect(() => {
    const defaultStats = {
      enseignants: 130,
      modules: 12,
      specialites: 3,
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

    setMiniTableData(organigrammeS1Data.slice(0, 5));
  }, []);

  // Données pour le graphique à barres (exemple simple)
  // Tu peux ajuster avec des données plus précises depuis localStorage ou API
  const graphData = [
    { name: 'Enseignants', value: Number(stats.enseignants) },
    { name: 'Modules', value: Number(stats.modules) },
    { name: 'Spécialités', value: Number(stats.specialites) },
  ];

  const handleGoToOrganigramme = () => {
    navigate('/organigramme');
  };
  const handleGoToModules = () => {
    navigate('/modules');
  };
  const handleGoToEnseignants = () => {
    navigate('/enseignants');
  };

  return (
    <div className="dashboardorga-container">
      <Sidebar />
      <main className="orga-main-content">
        <div className="orga-header">
          <h1 className="welcome">Bienvenue sur votre tableau de bord</h1>
        </div>

        {alertMessage && (
          <div className="alert-message" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <FaExclamationTriangle />
            <strong>Problème détecté :</strong> {alertMessage}
            <button
              className="orga-action-btn"
              onClick={() => navigate('/alerts')}
              style={{ marginLeft: 'auto' }}
            >
              Voir les alertes
            </button>
          </div>
        )}

        <div className="top-section">
          <div
            className="mini-organigramme-box"
            onClick={handleGoToOrganigramme}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="mini-title">Aperçu Organigramme S1</h3>

            <div className="mini-table-container">
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Module</th>
                    <th>Cours</th>
                    <th>TD1</th>
                  </tr>
                </thead>
                <tbody>
                  {miniTableData.length === 0 ? (
                    <tr><td colSpan="4">Chargement...</td></tr>
                  ) : (
                    miniTableData.map((ligne, index) => (
                      <tr key={index}>
                        <td>{ligne.Section}</td>
                        <td>{ligne.Module}</td>
                        <td>{ligne.Cours}</td>
                        <td>{ligne.TD1 || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {organigrammeS1Data.length > 5 && (
              <p className="mini-note">+ autres modules...</p>
            )}
          </div>

          <div className="cards-wrapper">
            <div className="card" onClick={handleGoToEnseignants} style={{ cursor: 'pointer' }}>
              <h2>
                <FaChalkboardTeacher />
                Total d’Enseignants
              </h2>
              <p>{stats.enseignants}</p>
            </div>
            <div className="card" onClick={handleGoToModules} style={{ cursor: 'pointer' }}>
              <h2>
                <FaBookOpen />
                Modules
              </h2>
              <p>{stats.modules}</p>
            </div>
            <div className="card">
              <h2>
                <FaGraduationCap />
                Spécialités
              </h2>
              <p>{stats.specialites}</p>
            </div>
            {/* Carte Statistiques avec graphique */}
            <div className="card" style={{ cursor: 'default' }}>
              <h2>Statistiques Visuelles</h2>
              <div style={{ width: '100%', height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={graphData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    barSize={20}
                  >
                    <XAxis dataKey="name" stroke="#1e3a8a" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboardorga;
