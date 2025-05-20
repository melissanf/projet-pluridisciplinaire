import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Sidebar from '../components/Sidebar';
import './alerts.css';

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      text: 'Dépassement des heures - Module Analyse 1',
      date: '15 janv.',
      hours: 26,
      type: 'red'
    },
    {
      id: 2,
      text: 'Proche de la limite - Module Analyse 2',
      date: '14 janv.',
      hours: 22,
      type: 'yellow'
    },
    {
      id: 3,
      text: 'Nouveau module assigné - Algèbre',
      date: '13 janv.',
      hours: 0,
      type: 'blue'
    }
  ]);

  const handleDelete = (id) => {
    const confirmation = window.confirm('Voulez-vous vraiment supprimer cette alerte ?');
    if (confirmation) {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    }
  };

  return (
    <PageWrapper>
      <div className="alerts-container">
        <Sidebar />
        <main className="alert-main">
          <h2 className="title">Alertes et Notifications</h2>

          {alerts.map((alert) => (
            <div key={alert.id} className={`alert-card ${alert.type}`}>
              <div className="alert-content">
                <p>{alert.text}</p>
                <div className="meta">
                  <span>⏱ {alert.hours} heures</span>
                  <span>{alert.date}</span>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(alert.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </main>
      </div>
    </PageWrapper>
  );
}
